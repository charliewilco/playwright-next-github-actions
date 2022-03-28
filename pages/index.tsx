import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { PersonModel, ConvertedPerson, IPerson } from "../db/models";
import { dbConnect } from "../db/connect";
import { ContactCard } from "../components/card";

export const getServerSideProps: GetServerSideProps<{
  people: ConvertedPerson[];
}> = async () => {
  await dbConnect();

  const result: IPerson[] = await PersonModel.find({});
  const people = result.map((doc) => {
    const p = doc.toObject();
    p._id = p._id.toString();
    return p;
  });

  return { props: { people: people ?? [] } };
};

const IndexPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ people }) => (
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

export default IndexPage;
