-- Development-only seed data. Never apply this file to production.
begin;

insert into public.categories (id, name, slug, description, kind, status, created_by, updated_by)
values
  ('10000000-0000-4000-8000-000000000001', 'Internal Concepts', 'internal-concepts', 'Original internal product and architecture explorations.', 'portfolio', 'published', null, null),
  ('10000000-0000-4000-8000-000000000002', 'Software Engineering', 'software-engineering', 'Practical articles about thoughtful software delivery.', 'blog', 'published', null, null),
  ('10000000-0000-4000-8000-000000000003', 'Digital Solutions', 'digital-solutions', 'Core digital product and automation services.', 'service', 'published', null, null)
on conflict (id) do nothing;

insert into public.portfolio_projects (
  id, title, slug, summary, challenge, solution, category_id, project_type,
  technologies, features, status, is_featured, created_by, updated_by
)
values
  (
    '20000000-0000-4000-8000-000000000001',
    'School Operations Portal',
    'school-operations-portal',
    'An internal concept exploring coordinated academic and administrative workflows.',
    'Operational information often spans disconnected tools and manual handoffs.',
    'A role-aware portal architecture organizes workflows around shared records and clear permissions.',
    '10000000-0000-4000-8000-000000000001',
    'Internal Concept',
    array['Next.js', 'TypeScript', 'PostgreSQL'],
    '["Role-aware workspace", "Operational dashboards", "Structured records"]'::jsonb,
    'draft', false, null, null
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    'AI Lead Routing Workflow',
    'ai-lead-routing-workflow',
    'A prototype showing reviewable AI-assisted lead classification and routing.',
    'Incoming inquiries need consistent classification without removing human oversight.',
    'A staged workflow validates input, suggests routing, and requires approval for exceptions.',
    '10000000-0000-4000-8000-000000000001',
    'Prototype',
    array['OpenAI', 'Node.js', 'PostgreSQL'],
    '["Validation", "Confidence thresholds", "Human review"]'::jsonb,
    'draft', true, null, null
  )
on conflict (id) do nothing;

insert into public.blog_articles (
  id, title, slug, description, excerpt, content, category_id,
  reading_time_minutes, difficulty, keywords, status, created_by, updated_by
)
values
  (
    '30000000-0000-4000-8000-000000000001',
    'Why Custom Software Beats Off-the-Shelf Tools',
    'why-custom-software-beats-off-the-shelf-tools',
    'A practical framework for deciding when tailored software is appropriate.',
    'Custom software is valuable when business workflows, ownership, and integration needs justify the investment.',
    '[{"heading":"Decision context","body":"Evaluate fit, ownership, integration, and maintenance before choosing an approach."}]'::jsonb,
    '10000000-0000-4000-8000-000000000002',
    8, 'Intermediate', array['custom software', 'architecture'], 'draft', null, null
  ),
  (
    '30000000-0000-4000-8000-000000000002',
    'API Integration Best Practices',
    'api-integration-best-practices',
    'Engineering considerations for reliable third-party system connections.',
    'Reliable integrations depend on validation, observable failures, idempotency, and careful permission boundaries.',
    '[{"heading":"Reliable boundaries","body":"Treat every external dependency as a fallible system boundary."}]'::jsonb,
    '10000000-0000-4000-8000-000000000002',
    10, 'Advanced', array['API integration', 'reliability'], 'draft', null, null
  )
on conflict (id) do nothing;

insert into public.services (
  id, title, slug, summary, description, category_id, features, technologies,
  status, is_featured, sort_order, created_by, updated_by
)
values
  ('40000000-0000-4000-8000-000000000001', 'Web Development', 'web-development', 'Custom websites and web applications.', 'Architecture, interface development, integrations, testing, and deployment planning for modern web products.', '10000000-0000-4000-8000-000000000003', array['Responsive design', 'SEO foundations', 'Accessibility'], array['Next.js', 'React', 'TypeScript'], 'draft', false, 10, null, null),
  ('40000000-0000-4000-8000-000000000002', 'AI Automation', 'ai-automation', 'Reviewable automation for connected business workflows.', 'Workflow mapping, AI-assisted decisions, integrations, exception handling, and human oversight.', '10000000-0000-4000-8000-000000000003', array['Workflow mapping', 'Human review', 'Auditability'], array['OpenAI', 'Node.js', 'PostgreSQL'], 'draft', true, 20, null, null),
  ('40000000-0000-4000-8000-000000000003', 'Custom SaaS', 'custom-saas', 'Purpose-built software platforms and internal systems.', 'Multi-tenant applications, portals, dashboards, permissions, and scalable product foundations.', '10000000-0000-4000-8000-000000000003', array['Role management', 'Dashboards', 'Integrations'], array['Next.js', 'PostgreSQL', 'Docker'], 'draft', false, 30, null, null)
on conflict (id) do nothing;

commit;
