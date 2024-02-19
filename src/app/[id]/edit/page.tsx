import { notFound } from "next/navigation";
import { EditContactForm } from "../../../components/contact-editor";
import { getPerson } from "../../actions";

interface Params {
	params: { id: string };
}

export async function generateMetadata({ params }: Params) {
	let data = await getPerson(params.id);
	return {
		title: `Edit ${data?.name ?? "Contact"}`,
	};
}

export default async function EditPerson({
	params,
}: {
	params: { id: string };
}) {
	let data = await getPerson(params.id);

	if (data === null) {
		return notFound();
	}

	return (
		<div>
			<EditContactForm
				name={data.name}
				age={data.age}
				city={data.city}
				id={params.id}
			/>
		</div>
	);
}
