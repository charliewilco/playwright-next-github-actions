"use client";
import { useCallback, useState, useId } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { produce } from "immer";

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
	initialValues: ContactFormValues;
}

interface ContactFormState {
	message: string | null;
	errors: Partial<Record<keyof ContactFormValues, string>>;
	form: ContactFormValues;
}

function formValidate(values: ContactFormValues) {
	let errors: Partial<Record<keyof ContactFormValues, string>> = {};

	if (!values.name) {
		errors.name = "Name is required";
	}

	if (!values.city) {
		errors.city = "City is required";
	}

	if (!values.age) {
		errors.age = "Age is required";
	}

	return errors;
}

export function CreateContactForm() {
	let id = useId();

	let [{ form, message, errors }, setState] = useState<ContactFormState>({
		message: null,
		errors: {},
		form: {
			...defaultValues,
		},
	});

	let router = useRouter();

	let postData = useCallback(
		async (form: ContactFormValues) => {
			try {
				let res = await fetch("/api/people", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(form),
				});

				if (!res.ok) {
					throw new Error(res.status.toString());
				}

				router.push("/");
			} catch (error) {
				setState(
					produce((draft) => {
						draft.message = "Failed to add person";
					})
				);
			}
		},
		[setState, router]
	);

	let handleChange = useCallback(
		(e: React.ChangeEvent<any>) => {
			let target = e.target;
			let value = target.value;
			let name = target.name as keyof ContactFormValues;
			setState(
				produce((draft) => {
					draft.message = null;
					return {
						...draft,
						form: {
							...draft.form,
							[name]: value,
						},
					};
				})
			);
		},
		[setState]
	);

	let handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			let errs = formValidate(form);
			if (Object.keys(errs).length === 0) {
				postData(form);
			} else {
				setState(
					produce((draft) => {
						draft.errors = errs;
					})
				);
			}
		},
		[postData, form]
	);

	return (
		<div className="editor-root">
			<form id={id} onSubmit={handleSubmit}>
				<div className="grid">
					<div>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							maxLength={20}
							name="name"
							value={form.name}
							onChange={handleChange}
							required
						/>
						{errors["name"] && <span className="error">{errors["name"]}</span>}
					</div>
					<div>
						<label htmlFor="city">City</label>
						<input
							type="text"
							maxLength={20}
							name="city"
							value={form.city}
							onChange={handleChange}
							required
						/>

						{errors["city"] && <span className="error">{errors["city"]}</span>}
					</div>

					<div>
						<label htmlFor="age">Age</label>
						<input
							type="number"
							name="age"
							value={form.age}
							onChange={handleChange}
						/>
						{errors["age"] && <span className="error">{errors["age"]}</span>}
					</div>
				</div>
				<div className="tray">
					<button type="submit">Submit</button>
				</div>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export function EditConactForm(props: ContactFormProps) {
	let id = useId();
	let router = useRouter();

	let [{ form, message, errors }, setState] = useState<ContactFormState>({
		message: null,
		errors: {},
		form: {
			...props.initialValues,
		},
	});

	let putData = useCallback(
		async (form: ContactFormValues) => {
			try {
				let res = await fetch(`/api/people/${props.id}`, {
					method: "PUT",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(form),
				});

				if (!res.ok) {
					throw new Error(res.status.toString());
				}

				let { data } = await res.json();

				mutate(`/api/people/${props.id}`, data, false);
				router.push("/");
			} catch (error) {
				setState(
					produce((draft) => {
						draft.message = "Failed to add person";
					})
				);
			}
		},
		[props.id, router, setState]
	);

	let handleChange = useCallback(
		(e: React.ChangeEvent<any>) => {
			let target = e.target;
			let value = target.value;
			let name = target.name as keyof ContactFormValues;
			setState(
				produce((draft) => {
					draft.message = null;
					return {
						...draft,
						form: {
							...draft.form,
							[name]: value,
						},
					};
				})
			);
		},
		[setState]
	);

	let handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			let errs = formValidate(form);
			if (Object.keys(errs).length === 0) {
				putData(form);
			} else {
				setState(
					produce((draft) => {
						draft.errors = errs;
					})
				);
			}
		},
		[form, putData]
	);

	return (
		<div className="editor-root">
			<form id={id} onSubmit={handleSubmit}>
				<div className="grid">
					<div>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							maxLength={20}
							name="name"
							value={form.name}
							onChange={handleChange}
							required
						/>
						{errors["name"] && <span className="error">{errors["name"]}</span>}
					</div>
					<div>
						<label htmlFor="city">City</label>
						<input
							type="text"
							maxLength={20}
							name="city"
							value={form.city}
							onChange={handleChange}
							required
						/>

						{errors["city"] && <span className="error">{errors["city"]}</span>}
					</div>

					<div>
						<label htmlFor="age">Age</label>
						<input
							type="number"
							name="age"
							value={form.age}
							onChange={handleChange}
						/>
						{errors["age"] && <span className="error">{errors["age"]}</span>}
					</div>
				</div>
				<div className="tray">
					<button type="submit">Submit</button>
				</div>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
