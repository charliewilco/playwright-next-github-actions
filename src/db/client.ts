import { MongoClient, Collection, Document } from "mongodb";

let client: MongoClient;
let db: Collection;

export interface PersonDocument extends Document {
	name: string;
	age: number;
	city: string;
}

async function connect() {
	client = new MongoClient(
		process.env.DB_ADDRESS ?? "mongodb://127.0.0.1:27017"
	);
	await client.connect();
	db = client.db("next-js-demo").collection("persons");
}

async function disconnect() {
	await client.close();
}

export { connect, disconnect, db as persons };
