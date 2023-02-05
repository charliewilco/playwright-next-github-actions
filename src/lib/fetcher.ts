export async function fetcher(url: string) {
	let respose = await fetch(url);
	let json = await respose.json();
	return json.data;
}
