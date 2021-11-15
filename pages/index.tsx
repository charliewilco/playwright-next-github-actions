import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head"
import Link from "next/link";
import { Avatar } from "../components/Avatar";
import { PersonModel, ConvertedPerson, IPerson } from "../db/models";
import { dbConnect } from "../db/connect";

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
    <header className="py-4">
      <h1 className="text-2xl font-bold">Contacts 👋</h1>
    </header>

    <div data-testid="LIST_HOME" className="py-2 space-y-4">
      {people.map(({ name, city, id, ...p }) => (
        <div className="card" data-testid="PERSON_CARD" key={p._id}>
          <div>
            <div>
              <Avatar>{name[0]}</Avatar>
            </div>
            <div>
              <h5>{name}</h5>

              <p>{city}</p>
            </div>
          </div>
          <div>
            <Link href="/[id]/edit" as={`/${id}/edit`} passHref>
              <button>Edit</button>
            </Link>
            <Link href="/[id]" as={`/${id}`} passHref>
              <button>Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default IndexPage;
