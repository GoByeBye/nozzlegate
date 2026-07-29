import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="global-footer__lead">
        <p className="eyebrow eyebrow--light">Corrections are welcome</p>
        <p className="global-footer__statement">
          This is a living record. If something is wrong, show us the source.
        </p>
      </div>

      <div className="global-footer__links">
        <Link href="/#case-files">Case files</Link>
        <Link href="/report">Reporting guide</Link>
        <Link href="/contribute">Contribute</Link>
        <Link href="/contribute#contact">Contact</Link>
        <Link href="/contribute#corrections">Corrections</Link>
        <Link href="/privacy">Privacy</Link>
      </div>

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
