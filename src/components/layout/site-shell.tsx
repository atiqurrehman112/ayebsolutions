interface SiteShellProps {
  readonly children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </div>
  );
}
