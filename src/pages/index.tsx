import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { PersonModel, type ConvertedPerson, type Person } from "../db/models";
import { dbConnect } from "../db/connect";
import { ContactCard } from "../components/card";

interface IndexPageProps {
  people: ConvertedPerson[];
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  await dbConnect();

  const result: Person[] = await PersonModel.find({});
  const people = result.map<ConvertedPerson>((doc) => {
    return {
      name: doc.name,
      city: doc.city,
      age: doc.age,
      _id: doc._id.toString(),
    };
  });

  return { props: { people: people ?? [] } };
};

const IndexPage: NextPage<IndexPageProps> = ({ people }) => {
  return (
    <div>
      <Head>
        <title>Home | Next.js + TypeScript Example</title>
      </Head>
      <header>
        <h1>Contacts 👋</h1>
      </header>

      <div>
        {people.map(({ name, city, ...p }) => (
          <ContactCard name={name} city={city} id={p._id} key={p._id} />
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
