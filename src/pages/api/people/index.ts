import { NextApiRequest, NextApiResponse } from "next";
import { DBAdapter, PersonType } from "../../../db/adapter";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		| {
				success: true;
				data: PersonType[] | PersonType;
		  }
		| {
				success: false;
		  }
	>
) {
	await DBAdapter.instance.connect();

	switch (req.method) {
		case "GET":
			try {
				let results = await DBAdapter.instance.models.person.find(
					{}
				); /* find all the data in our database */
				res.status(200).json({ success: true, data: results.map(DBAdapter.toPerson) });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				let person = await DBAdapter.instance.models.person.create(
					req.body
				); /* create a new model in the database */
				res.status(201).json({ success: true, data: DBAdapter.toPerson(person) });
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
