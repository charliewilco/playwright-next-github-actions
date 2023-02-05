import { NextApiRequest, NextApiResponse } from "next";
import { DBAdapter } from "../../../db/adapter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let {
		query: { id },
		method,
	} = req;

	if (id) {
		await DBAdapter.instance.connect();
		switch (method) {
			case "GET" /* Get a model by its ID */:
				try {
					let person = await DBAdapter.instance.models.person.findById(id);
					if (!person) {
						return res.status(400).json({ success: false });
					}
					res.status(200).json({ success: true, data: person });
				} catch (error) {
					res.status(400).json({ success: false });
				}
				break;

			case "PUT" /* Edit a model by its ID */:
				try {
					let person = await DBAdapter.instance.models.person.findByIdAndUpdate(id, req.body, {
						new: true,
						runValidators: true,
					});
					if (!person) {
						return res.status(400).json({ success: false });
					}
					res.status(200).json({ success: true, data: person });
				} catch (error) {
					res.status(400).json({ success: false });
				}
				break;

			case "DELETE" /* Delete a model by its ID */:
				try {
					let deletedPerson = await DBAdapter.instance.models.person.deleteOne({ _id: id });
					if (!deletedPerson) {
						return res.status(400).json({ success: false });
					}
					res.status(200).json({ success: true, data: {} });
				} catch (error) {
					res.status(400).json({ success: false });
				}
				break;

			default:
				res.status(400).json({ success: false });
				break;
		}
	}
}
