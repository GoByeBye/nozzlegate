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
          <Link href="/#case-files">Case files</Link>
          <Link href="/report">Report it</Link>
          <Link href="/contribute">Contribute</Link>
        </nav>

        <Link className="header-action" href="/report">
          Take action <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
