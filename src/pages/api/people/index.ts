import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../db/connect";
import { PersonModel } from "../../../db/models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const people = await PersonModel.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: people });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const person = await PersonModel.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: person });
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
