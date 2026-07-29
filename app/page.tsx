import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Information is coming... | nozzlegate.com",
  description: "Information is coming to nozzlegate.com.",
};

export default function Home() {
  return (
    <main className="landing-shell">
      <section className="landing-message" aria-labelledby="coming-heading">
        <p className="landing-kicker">nozzlegate.com</p>
        <h1 id="coming-heading">
          Information is <span className="landing-accent">coming...</span>
        </h1>
        <div className="landing-mark" aria-hidden="true" />
      </section>
    </main>
  );
}
