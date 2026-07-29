import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="global-footer__lead">
        <p>Have evidence, a correction or a company response?</p>
        <Link className="text-link" href="/contribute">
          Contribute <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <nav className="global-footer__links" aria-label="Footer">
        <Link href="/#case-files">Case files</Link>
        <Link href="/report">Reporting guide</Link>
        <Link href="/contribute#contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>

      <div className="global-footer__meta">
        <p>Open-source consumer documentation · Updated 29 July 2026</p>
        <p>
          made with spite &amp; anger by{" "}
          <a href="https://daddie.dev" target="_blank" rel="noreferrer">
            daddie.dev
          </a>
        </p>
      </div>
    </footer>
  );
}
