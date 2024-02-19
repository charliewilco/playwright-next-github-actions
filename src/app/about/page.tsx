import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "About | Next.js + TypeScript Example",
};

export default function AboutPage() {
	return (
		<div>
			<h1>About</h1>
			<section>
				<p>This is the about page</p>
				<p>
					<Link href="/">Go home</Link>
				</p>
			</section>
		</div>
	);
}
