const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Information is coming to nozzlegate.com." />
    <title>Information is coming... | nozzlegate.com</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap");

      :root {
        color-scheme: dark;
        --background: #0e0e10;
        --foreground: #ffffff;
        --yellow: #ffd700;
      }

      * { box-sizing: border-box; }

      html, body {
        background: var(--background);
        color: var(--foreground);
        margin: 0;
        min-height: 100%;
      }

      body {
        font-family: "Montserrat", Arial, Helvetica, sans-serif;
        font-weight: 300;
      }

      .landing-shell {
        position: relative;
        isolation: isolate;
        display: grid;
        min-height: 100svh;
        place-items: center;
        overflow: hidden;
        padding: 32px;
        background:
          radial-gradient(circle at 50% 45%, rgb(38 31 72 / 0.16), transparent 34%),
          var(--background);
      }

      .landing-shell::before {
        position: absolute;
        inset: 0;
        z-index: -1;
        background-image: linear-gradient(
          90deg,
          transparent 0,
          rgb(255 255 255 / 0.025) 50%,
          transparent 100%
        );
        background-size: 100% 1px;
        content: "";
        opacity: 0.24;
      }

      .landing-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .landing-kicker {
        margin: 0 0 20px;
        color: var(--yellow);
        font-size: 0.72rem;
        font-weight: 400;
        letter-spacing: 0.28em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        color: var(--foreground);
        font-size: clamp(2.25rem, 6vw, 4rem);
        font-weight: 300;
        letter-spacing: -0.045em;
        line-height: 1.12;
      }

      .landing-accent {
        background: linear-gradient(105deg, #6b50ff, #8d6cff 58%, #4e42d9);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }

      .landing-mark {
        width: 116px;
        height: 10px;
        margin-top: 34px;
        border: 2px solid var(--yellow);
        box-shadow: 4.8px 4.8px 0 var(--yellow);
      }

      @media (max-width: 560px) {
        .landing-shell { padding: 24px; }
        .landing-kicker {
          margin-bottom: 16px;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
        }
        h1 {
          max-width: 9ch;
          font-size: clamp(2.35rem, 12vw, 3.4rem);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .landing-shell::before { display: none; }
      }
    </style>
  </head>
  <body>
    <main class="landing-shell">
      <section class="landing-message" aria-labelledby="coming-heading">
        <p class="landing-kicker">nozzlegate.com</p>
        <h1 id="coming-heading">Information is <span class="landing-accent">coming...</span></h1>
        <div class="landing-mark" aria-hidden="true"></div>
      </section>
    </main>
  </body>
</html>`;

addEventListener("fetch", (event) => {
  event.respondWith(
    new Response(page, {
      headers: {
        "cache-control": "public, max-age=300",
        "content-type": "text/html; charset=UTF-8",
        "x-content-type-options": "nosniff",
      },
    }),
  );
});
