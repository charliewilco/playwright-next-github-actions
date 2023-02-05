import { CreateContactForm } from "../../components/contact-editor";

export default function NewPage() {
	return (
		<div>
			<header>
				<h1>Add New Contact</h1>
			</header>

			<div>
				<CreateContactForm />
			</div>
		</div>
	);
}
