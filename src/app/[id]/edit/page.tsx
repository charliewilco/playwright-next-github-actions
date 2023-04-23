import Head from "next/head";
import { notFound } from "next/navigation";
import { EditConactForm as EditContactForm } from "../../../components/contact-editor";
import { getPerson } from "../../../lib/people";

export default async function EditPerson({ params }: { params: { id: string } }) {
	let data = await getPerson(params.id);

	if (data === null) {
		return notFound();
	}

	return (
		<div>
			<Head>
				<title>Edit {data.name}</title>
			</Head>
			<EditContactForm initialValues={{ ...data }} id={params.id} />
		</div>
	);
}
