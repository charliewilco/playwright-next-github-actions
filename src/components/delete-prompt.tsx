"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface DeletePromptProps {
	id: string;
}

export function DeletePrompt(props: DeletePromptProps) {
	let [message, setMessage] = useState("");
	let router = useRouter();
	let handleDelete = useCallback(async () => {
		try {
			await fetch(`/api/people/${props.id}`, {
				method: "DELETE",
			});
			router.push("/");
		} catch (error) {
			setMessage("Failed to delete the person.");
		}
	}, [props.id, setMessage, router]);

	return (
		<div>
			{message && <p>{message}</p>}
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
}
