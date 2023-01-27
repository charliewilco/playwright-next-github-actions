"use client";
import Head from "next/head";
import useSWR from "swr";
import { ContactForm } from "../../../components/contact-editor";

const fetcher = (url: string) =>
	fetch(url)
		.then((res) => res.json())
		.then((json) => json.data);

const EditPerson = ({ params }: { params: { id: string } }) => {
	console.log(params, "params");
	const { data, error } = useSWR(params.id ? `/api/people/${params.id}` : null, fetcher);

	if (error) return <p>Failed to load</p>;
	if (!data) return <p>Loading...</p>;

	const initialValues = {
		...data,
	};

	return (
		<div>
			<Head>
				<title>Edit {initialValues.name} </title>
			</Head>
			<ContactForm
				formId="edit-form"
				initialValues={initialValues}
				id={params.id}
				create={false}
			/>
		</div>
	);
};

export default EditPerson;
