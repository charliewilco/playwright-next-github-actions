interface AvatarProps {
	name: string;
}

export function Avatar(props: AvatarProps) {
	return (
		<figure className="avatar">
			<div className="">
				<span className="avatar-initials">
					<span>{props.name}</span>
				</span>
			</div>
		</figure>
	);
}
