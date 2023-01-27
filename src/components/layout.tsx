import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	return (
		<div className="outer">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="icon" href="favicon.ico" />
			</Head>
			<header>
				<nav role="banner">
					<div>
						<Link href="/" className={router.asPath === "/" ? "active" : ""}>
							Home
						</Link>
						<Link href="/about" className={router.asPath === "/about" ? "active" : ""}>
							About
						</Link>
					</div>
					<Link href="/new" className="new">
						New
					</Link>
				</nav>
			</header>
			<main>{children}</main>
			<footer className="copyright">
				<span>I&apos;m here to stay (Footer)</span>
			</footer>
		</div>
	);
};
