"use server";

import { DBAdapter, type PersonDocument, type PersonType } from "../db/adapter";

type ContactFormValues = {
	name: string;
	city: string;
	age: number;
};

function formValidate(values: Partial<ContactFormValues>) {
	let errors: Partial<Record<keyof ContactFormValues, string>> = {};
	let hasErrors = false;

	if (!values.name) {
		errors.name = "Name is required";
		hasErrors = true;
	}

	if (!values.city) {
		errors.city = "City is required";
		hasErrors = true;
	}

	if (!values.age) {
		errors.age = "Age is required";

		hasErrors = true;
	}

	return { errors, hasErrors };
}

type Result<T, E> = { data?: T; ok: true } | { error?: E; ok: false };

export type ActionState = null | Result<
	Partial<ContactFormValues> & { id: string },
	Partial<Record<keyof ContactFormValues, string>>
>;

export async function createContact(
	_prevState: ActionState,
	formData: FormData
): Promise<ActionState> {
	const age = formData.get("age")?.toString();
	const data = {
		name: formData.get("name")?.toString(),
		city: formData.get("city")?.toString(),
		age: parseInt(age ?? "0"),
	};
	const { errors, hasErrors } = formValidate(data);
	if (hasErrors) {
		return { error: errors, ok: false };
	}
	await DBAdapter.instance.connect();
	let person = await DBAdapter.instance.models.person.create(data);

	return {
		ok: true,
		data: {
			name: person?.name,
			city: person?.city,
			age: person?.age,
			id: person?._id,
		},
	};
}

export async function updateContact(
	_prevState: ActionState,
	formData: FormData
): Promise<ActionState> {
	const age = formData.get("age")?.toString();
	// biome-ignore lint/style/noNonNullAssertion: i said so
	const id = formData.get("id")?.toString()!;
	const data = {
		name: formData.get("name")?.toString(),
		city: formData.get("city")?.toString(),
		age: parseInt(age ?? "0"),
		id,
	};

	const { errors, hasErrors } = formValidate(data);
	if (hasErrors) {
		return { error: errors, ok: false };
	}
	await DBAdapter.instance.connect();
	let person: PersonDocument | null =
		await DBAdapter.instance.models.person.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		});

	return {
		ok: true,
		data: {
			name: person?.name,
			city: person?.city,
			age: person?.age,
			id,
		},
	};
}

export async function deleteContact(
	id: string
): Promise<Result<{ message: string }, string>> {
	try {
		await DBAdapter.instance.connect();
		let removed = await DBAdapter.instance.models.person.deleteOne({ _id: id });

		console.log(removed);
		return {
			ok: true,
			data: { message: "Contact deleted" },
		};
	} catch (error) {
		return { ok: false, error: "Something went wrong!" };
	}
}

export async function getPeople(): Promise<PersonType[]> {
	await DBAdapter.instance.connect();

	let result: PersonDocument[] = await DBAdapter.instance.models.person.find(
		{}
	);
	let people = result.map<PersonType>(DBAdapter.toPerson);

	return people ?? [];
}

export async function getPerson(id: string): Promise<PersonType | null> {
	await DBAdapter.instance.connect();
	try {
		let result = await DBAdapter.instance.models.person.findById(id);
		if (result !== null) {
			return DBAdapter.toPerson(result);
		}
		return null;
	} catch (error) {
		throw new Error("Person not found");
	}
}
