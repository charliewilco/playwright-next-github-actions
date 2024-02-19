import type { Metadata } from "next";
import { ContactCard } from "../components/card";
import { cachedPeople } from "./actions";

export const metadata: Metadata = {
	title: "MongoDB Next.js Demo",
};

export default async function IndexPage() {
	let people = await cachedPeople();

	let content: JSX.Element | JSX.Element[];

	if (people.length === 0) {
		content = <p className="empty">No people found</p>;
	} else {
		content = people.map(({ name, city, ...p }) => (
			<ContactCard name={name} city={city} id={p._id} key={p._id} />
		));
	}

	return (
		<div>
			<header>
				<h1>Contacts 👋</h1>
			</header>

			<div>{content}</div>
		</div>
	);
}
