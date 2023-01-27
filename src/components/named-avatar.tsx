export function Avatar({ children }: { children: React.ReactNode }) {
	return (
		<figure className="avatar">
			<div className="">
				<span className="avatar-initials">{children}</span>
			</div>
		</figure>
	);
}
