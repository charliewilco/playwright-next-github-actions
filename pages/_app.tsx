import { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className="outer">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <header>
        <nav>
          <div>
            <Link href="/">
              <a className={router.asPath === "/" ? "active" : ""}>Home</a>
            </Link>
            <Link href="/about">
              <a
                data-testid="ABOUT_LINK"
                className={router.asPath === "/about" ? "active" : ""}
              >
                About
              </a>
            </Link>
          </div>
          <Link href="/new">
            <a data-testid="NEW_LINK" className="new">
              New
            </a>
          </Link>{" "}
        </nav>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        <span>I&apos;m here to stay (Footer)</span>
      </footer>

      <style jsx>{`
        .new {
          background: var(--surface);
          padding: 0.5rem 1rem;
          color: var(--fg);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border-radius: 0.5rem;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }

        a.active {
          font-weight: 700;
        }

        nav > div a {
          display: inline-block;
          margin-right: 1rem;
        }

        footer {
          padding: 1rem 0.5rem;
          border-top: 1px solid rgb(136, 140, 145);
          text-align: center;
        }

        header,
        main,
        footer {
          max-width: 48rem;
          margin: 0 auto 1rem;
        }

        .outer {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
      `}</style>
      <style jsx global>{`
        :root {
          --monospace: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
            Liberation Mono, monospace;
          --sans-serif: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          --bg: rgb(243, 244, 246);
          --fg: #3c4043;
          --highlight: #3b82f6;
          --surface: #fff;
        }

        * {
          margin: 0;
          padding: 0;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html {
          box-sizing: border-box;
          text-size-adjust: 100%;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          -webkit-tap-highlight-color: transparent;
          background: var(--bg);
          color: var(--fg);
          font: 400 100% / 1.3 var(--sans-serif);
        }

        a {
          text-decoration: none;
          color: var(--highlight);
        }

        h1 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --fg: #fafafa;
            --bg: #181818;
            --surface: #0a0a0a;
            --highlight: #3b82f6;
          }
        }
      `}</style>
    </div>
  );
}

export default MyApp;
