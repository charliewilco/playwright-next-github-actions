import { ContactForm, defaultValues } from "../../components/contact-editor";

export default function NewPage() {
	return (
		<div>
			<header>
				<h1>Add New Contact</h1>
			</header>

			<div>
				<ContactForm formId="add-person-form" initialValues={defaultValues} />
			</div>
		</div>
	);
}
