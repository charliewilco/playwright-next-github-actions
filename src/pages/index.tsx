import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { DBAdapter, type PersonType, type PersonDocument } from "../db/adapter";
import { ContactCard } from "../components/card";

interface IndexPageProps {
  people: PersonType[];
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  await DBAdapter.instance.connect();

  const result: PersonDocument[] = await DBAdapter.instance.models.person.find({});
  const people = result.map<PersonType>(DBAdapter.toPerson);

  return { props: { people: people ?? [] } };
};

const IndexPage: NextPage<IndexPageProps> = ({ people }) => {
  let content;

  if (people.length === 0) {
    content = <p className="empty">No people found</p>;
  } else {
    content = people.map(({ name, city, ...p }) => (
      <ContactCard name={name} city={city} id={p._id} key={p._id} />
    ));
  }

  return (
    <div>
      <Head>
        <title>Home | Next.js + TypeScript Example</title>
      </Head>
      <header>
        <h1>Contacts 👋</h1>
      </header>

      <div>{content}</div>
    </div>
  );
};

export default IndexPage;
