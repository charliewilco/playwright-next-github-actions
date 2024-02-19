import { Metadata } from "next";
import { CreateContactForm } from "../../components/contact-editor";

export const metadata: Metadata = {
	title: "New Person",
};

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
