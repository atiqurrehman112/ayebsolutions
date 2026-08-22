begin;

do $$
declare
  function_definition text;
begin
  select pg_get_functiondef(procedure.oid)
    into function_definition
  from pg_proc procedure
  join pg_namespace namespace on namespace.oid = procedure.pronamespace
  where namespace.nspname = 'public'
    and procedure.proname = 'crm_dashboard_analytics'
    and pg_get_function_identity_arguments(procedure.oid) = 'p_from timestamp with time zone, p_to timestamp with time zone';

  if function_definition is null then
    raise exception 'crm_dashboard_analytics(timestamptz, timestamptz) was not found';
  end if;

  if position('p.email' in function_definition) = 0 then
    raise exception 'Expected invalid profiles.email reference was not found';
  end if;

  function_definition := replace(function_definition, 'p.email,', '');

  if position('p.email' in function_definition) > 0 then
    raise exception 'Invalid profiles.email reference could not be replaced';
  end if;

  execute function_definition;
end;
$$;

do $$
declare
  active_user_id uuid;
  analytics jsonb;
begin
  select id into active_user_id
  from public.profiles
  where status = 'active' and role in ('admin', 'editor', 'viewer')
  order by case role when 'admin' then 1 when 'editor' then 2 else 3 end
  limit 1;

  if active_user_id is not null then
    perform set_config('request.jwt.claim.sub', active_user_id::text, true);
    analytics := public.crm_dashboard_analytics(
      timezone('utc', now()) - interval '30 days',
      timezone('utc', now())
    );

    if analytics is null
      or analytics->'statistics' is null
      or analytics->'statusDistribution' is null
      or analytics->'monthlyLeads' is null
      or analytics->'leadSources' is null
      or analytics->'activity' is null
      or analytics->'followUps' is null
      or analytics->'kpis' is null
      or analytics->'leaderboard' is null
      or analytics->'smart' is null then
      raise exception 'CRM analytics did not return its complete response contract';
    end if;
  end if;
end;
$$;

commit;
