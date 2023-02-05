import Link from "next/link";
import "../components/styles.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	let pathname: string = "/";

	return (
		<html>
			<head />
			<body>
				<div className="outer">
					<header>
						<nav role="banner">
							<div>
								<Link href="/" className={pathname === "/" ? "active" : ""}>
									Home
								</Link>
								<Link href="/about" className={pathname === "/about" ? "active" : ""}>
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
			</body>
		</html>
	);
}
