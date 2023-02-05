import { useMemo } from "react";
import { ContactCard } from "../components/card";
import { getPeople } from "../lib/people";

export default async function IndexPage() {
	let people = await getPeople();

	let content = useMemo(() => {
		if (people.length === 0) {
			return <p className="empty">No people found</p>;
		} else {
			return people.map(({ name, city, ...p }) => (
				<ContactCard name={name} city={city} id={p._id} key={p._id} />
			));
		}
	}, [people]);

	return (
		<div>
			<header>
				<h1>Contacts 👋</h1>
			</header>

			<div>{content}</div>
		</div>
	);
}
