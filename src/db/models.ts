import mongoose from "mongoose";

export interface Person extends mongoose.Document {
  name: string;
  age: number;
  city: string;
}

const PersonSchema = new mongoose.Schema<Person>({
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

export const PersonModel: mongoose.Model<Person> =
  mongoose.models.Person || mongoose.model<Person>("Person", PersonSchema);

export type ConvertedPerson = Pick<
  Pick<mongoose._LeanDocument<Person>, "_id" | "id" | "name" | "age" | "city">,
  "_id" | "id" | "name" | "age" | "city"
>;
