import mongoose from "mongoose";

export interface PersonDocument extends mongoose.Document {
  name: string;
  age: number;
  city: string;
}

const PersonSchema = new mongoose.Schema<PersonDocument>({
  name: {
    type: String,
    required: [true, "What's your name?"],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
    required: [true, "Where are you"],
  },
});

export type PersonType = Pick<
  Pick<mongoose._LeanDocument<PersonDocument>, "_id" | "id" | "name" | "age" | "city">,
  "_id" | "id" | "name" | "age" | "city"
>;

interface ConntectionStatus {
  isConnected?: number;
}

interface Models {
  person: mongoose.Model<PersonDocument>;
}

export class DBAdapter {
  static instance = new DBAdapter();
  static toPerson(doc: PersonDocument): PersonType {
    return {
      name: doc.name,
      city: doc.city,
      age: doc.age,
      _id: doc._id.toString(),
    };
  }
  connection: ConntectionStatus = {};

  models: Models = {
    person: mongoose.models.Person || mongoose.model<PersonDocument>("Person", PersonSchema),
  };

  constructor(
    private connectionURL = process.env.DB_ADDRESS || "mongodb://127.0.0.1:27017/next-js-demo"
  ) {}

  async connect() {
    if (this.connection.isConnected) {
      return;
    }

    const db = await mongoose.connect(this.connectionURL);

    this.connection.isConnected = db.connections[0].readyState;
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async drop() {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.drop();
    }
  }
}
