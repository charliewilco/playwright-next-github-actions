import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export const PageLayout: React.FC = ({ children }) => {
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
              <a className={router.asPath === "/about" ? "active" : ""}>
                About
              </a>
            </Link>
          </div>
          <Link href="/new">
            <a className="new">New</a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
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
      `}</style>
    </div>
  );
};
