import { DBAdapter, type PersonType, type PersonDocument } from "../db/adapter";

export async function getPeople(): Promise<PersonType[]> {
	await DBAdapter.instance.connect();

	let result: PersonDocument[] = await DBAdapter.instance.models.person.find({});
	let people = result.map<PersonType>(DBAdapter.toPerson);

	return people ?? [];
}

export async function getPerson(id: string): Promise<PersonType | null> {
	await DBAdapter.instance.connect();
	try {
		let result = await DBAdapter.instance.models.person.findById(id);
		if (result !== null) {
			return DBAdapter.toPerson(result);
		} else {
			return null;
		}
	} catch (error) {
		throw new Error("Person not found");
	}
}
