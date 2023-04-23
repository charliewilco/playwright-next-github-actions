import "../components/styles.css";
import { Nav } from "../components/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>
				<div className="outer">
					<header>
						<Nav />
					</header>
					<main>{children}</main>
					<footer className="copyright">
						<span>I&apos;m here to stay (Footer)</span>
					</footer>
				</div>
			</body>
		</html>
	); }
