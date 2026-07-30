import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Nozzlegate home">
          <span>NOZZLE</span>
          <span className="wordmark__slash">/</span>
          <span>GATE</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#case-files">Issues</Link>
          <Link href="/report">Report</Link>
          <Link href="/contribute">Contribute</Link>
        </nav>

        <Link className="header-action" href="/report">
          Report an issue <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
