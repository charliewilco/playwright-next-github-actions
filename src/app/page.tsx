import { DBAdapter, type PersonType, type PersonDocument } from "../db/adapter";
import { ContactCard } from "../components/card";

async function getPeople(): Promise<PersonType[]> {
	await DBAdapter.instance.connect();

	const result: PersonDocument[] = await DBAdapter.instance.models.person.find({});
	const people = result.map<PersonType>(DBAdapter.toPerson);

	return people ?? [];
}

async function IndexPage() {
	const people = await getPeople();
	let content;

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

export default IndexPage;
