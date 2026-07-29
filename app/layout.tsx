import type { Metadata } from "next";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nozzlegate.com"),
  title: {
    default: "Nozzlegate — the open consumer record",
    template: "%s | Nozzlegate",
  },
  description:
    "A source-first public record of the Bondtech INDX nozzle mismatch, payment surcharges and warranty terms.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Nozzlegate",
    title: "Nozzlegate — the open consumer record",
    description:
      "Three case files. Source-first. Open to evidence and correction.",
    images: [
      {
        url: "/og.png",
        width: 1733,
        height: 909,
        alt: "Nozzlegate — the record is the point",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nozzlegate — the open consumer record",
    description:
      "Three case files. Source-first. Open to evidence and correction.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
