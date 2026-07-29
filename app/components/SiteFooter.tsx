import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="global-footer__lead">
        <p className="eyebrow eyebrow--light">The record stays open</p>
        <p className="global-footer__statement">
          Facts can change. Receipts do not. Corrections and primary evidence
          are welcome.
        </p>
      </div>

      <div className="global-footer__links">
        <Link href="/#case-files">Case files</Link>
        <Link href="/report">Reporting guide</Link>
        <Link href="/contribute">Evidence standard</Link>
        <Link href="/contribute#corrections">Corrections</Link>
      </div>

      <div className="global-footer__meta">
        <p>Open-source consumer documentation · Updated 29 July 2026</p>
        <p>
          made with hate by{" "}
          <a href="https://daddie.dev" target="_blank" rel="noreferrer">
            daddie.dev
          </a>
        </p>
      </div>
    </footer>
  );
}
