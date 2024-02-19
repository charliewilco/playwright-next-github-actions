"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteContact } from "../app/actions";

interface DeletePromptProps {
	id: string;
}

export function DeletePrompt({ id }: DeletePromptProps) {
	let router = useRouter();

	let [, startTransition] = useTransition();

	return (
		<div>
			<button
				type="button"
				onClick={() => {
					startTransition(() => {
						deleteContact(id).then((result) => {
							if (result.ok) {
								router.push("/");
							}
						});
					});
				}}
			>
				Delete
			</button>
		</div>
	);
}
