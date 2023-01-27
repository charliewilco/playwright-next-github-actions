import { use } from "react";
import Link from "next/link";
import { DBAdapter, type PersonType } from "../../db/adapter";
import { Avatar } from "../../components/named-avatar";
import { DeletePrompt } from "../../components/delete-prompt";

async function getPerson(id: string): Promise<PersonType | null> {
	await DBAdapter.instance.connect();
	const result = await DBAdapter.instance.models.person.findById(id);
	if (result !== null) {
		return DBAdapter.toPerson(result);
	} else {
		return null;
	}
}

function DetailsPage({ params: { id } }: { params: { id: string } }) {
	const person = use(getPerson(id));

	if (!person) {
		return <h1>Not found</h1>;
	}

	return (
		<div>
			<header className="DetailsHeader">
				<div>
					<Avatar>{person.name[0]}</Avatar>
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

export default DetailsPage;
