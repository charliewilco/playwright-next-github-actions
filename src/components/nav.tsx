"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
	let pathname = usePathname();

	return (
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
	);
}
