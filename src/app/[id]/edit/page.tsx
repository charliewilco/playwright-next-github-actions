"use client";
import Head from "next/head";
import useSWR from "swr";
import { EditConactForm } from "../../../components/contact-editor";
import { fetcher } from "../../../lib/fetcher";

export default function EditPerson({ params }: { params: { id: string } }) {
	let { data, error } = useSWR(params.id ? `/api/people/${params.id}` : null, fetcher);

	if (error) return <p>Failed to load</p>;
	if (!data) return <p>Loading...</p>;

	let initialValues = {
		...data,
	};

	return (
		<div>
			<Head>
				<title>Edit {initialValues.name}</title>
			</Head>
			<EditConactForm initialValues={initialValues} id={params.id} />
		</div>
	);
}
