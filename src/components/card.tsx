import Link from "next/link";
import { Avatar } from "./named-avatar";

interface ContactCardProps {
	name: string;
	city: string;
	id: string;
}

export function ContactCard(props: ContactCardProps) {
	return (
		<div className="card">
			<div className="card-content">
				<Avatar name={props.name[0]} />
				<div>
					<h5>{props.name}</h5>

					<p className="city">{props.city}</p>
				</div>
			</div>
			<div className="card-actions">
				<Link href="/[id]/edit" as={`/${props.id}/edit`}>
					<button type="button">Edit</button>
				</Link>
				<Link href="/[id]" as={`/${props.id}`}>
					<button type="button">Details</button>
				</Link>
			</div>
		</div>
	);
}
