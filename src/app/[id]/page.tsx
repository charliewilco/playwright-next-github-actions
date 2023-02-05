import Link from "next/link";
import { Avatar } from "../../components/named-avatar";
import { DeletePrompt } from "../../components/delete-prompt";
import { getPeople, getPerson } from "../../lib/people";

export async function generateStaticParams() {
	let contacts = await getPeople();
	return contacts.map((person) => ({
		id: person._id,
	}));
}

export let revalidate = 60;

export default async function DetailsPage({ params: { id } }: { params: { id: string } }) {
	let person = await getPerson(id);

	if (!person) {
		return <h1>Not found</h1>;
	}

	return (
		<div>
			<header className="DetailsHeader">
				<div>
					<Avatar name={person.name[0]} />
					<h1>{person.name}</h1>
				</div>
				<div>
					<Link href="/[id]/edit" as={`/${person._id}/edit`} passHref>
						<button>Edit</button>
					</Link>
					<DeletePrompt id={id} />
				</div>
			</header>

			<div className="card">
				<div className="DetailGrid">
					<div>
						<p>{person.age}</p>
						<span className="label">Age</span>
					</div>
					<div>
						<p>{person.city}</p>
						<span className="label">City</span>
					</div>
					<div>
						<p>N/A</p>
						<span className="label">Phone #</span>
					</div>
				</div>
			</div>
		</div>
	);
}
