"use client";
import { useId } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { createContact, updateContact } from "../app/actions";

type ContactFormValues = {
	name: string;
	city: string;
	age: number;
};

export let defaultValues: ContactFormValues = {
	name: "",
	city: "Seattle",
	age: 24,
};

interface ContactFormProps {
	id: string;
	age: number;
	name: string;
	city: string;
}

export function CreateContactForm() {
	let formId = useId();
	let router = useRouter();

	let [state, formAction] = useFormState(createContact, null);
	let { pending } = useFormStatus();

	if (state?.ok) {
		router.push(`/${state.data?.id}`);
	}

	return (
		<div className="editor-root">
			<form id={formId} action={formAction}>
				<div className="grid">
					<div>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							maxLength={20}
							name="name"
							defaultValue={defaultValues.name}
							required
						/>
					</div>
					<div>
						<label htmlFor="city">City</label>
						<input
							type="text"
							maxLength={20}
							name="city"
							defaultValue={defaultValues.city}
							required
						/>
					</div>

					<div>
						<label htmlFor="age">Age</label>
						<input type="number" name="age" defaultValue={defaultValues.age} />
					</div>
				</div>
				<div className="tray">
					<button type="submit" aria-disabled={pending}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export function EditContactForm({ age, name, city, id }: ContactFormProps) {
	let formId = useId();
	let router = useRouter();

	let [state, formAction] = useFormState(updateContact, null);
	let { pending } = useFormStatus();

	if (state?.ok) {
		router.push(`/${id}`);
	}

	return (
		<div className="editor-root">
			<form id={formId} action={formAction}>
				<input type="hidden" name="id" value={id} />
				<div className="grid">
					<div>
						<label htmlFor="name">Name</label>
						<input type="text" maxLength={20} name="name" defaultValue={name} />
					</div>
					<div>
						<label htmlFor="city">City</label>
						<input
							type="text"
							maxLength={20}
							name="city"
							defaultValue={city}
							required
						/>
					</div>

					<div>
						<label htmlFor="age">Age</label>
						<input type="number" name="age" defaultValue={age} />
					</div>
				</div>
				<div className="tray">
					<button type="submit" aria-disabled={pending}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
