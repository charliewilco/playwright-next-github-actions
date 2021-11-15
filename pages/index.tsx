import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
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
    <header>
      <h1>Contacts 👋</h1>
    </header>

    <div data-testid="LIST_HOME" className="py-2 space-y-4">
      {people.map(({ name, city, ...p }) => (
        <div className="card" data-testid="PERSON_CARD" key={p._id}>
          <div className="card-content">
            <Avatar>{name[0]}</Avatar>
            <div>
              <h5>{name}</h5>

              <p>{city}</p>
            </div>
          </div>
          <div className="card-actions">
            <Link href="/[id]/edit" as={`/${p._id}/edit`} passHref>
              <button>Edit</button>
            </Link>
            <Link href="/[id]" as={`/${p._id}`} passHref>
              <button>Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
    <style jsx>
      {`
        .card {
          background: var(--surface);
          padding: 1rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .card-content {
          display: flex;
          margin-bottom: 1rem;
        }

        .card-content > div {
          margin-left: 1rem;
        }

        .card-actions {
          border-top: 1px solid rgb(136, 140, 145);
          padding: 0.5rem 0;
          display: flex;
          justify-content: flex-end;
        }

        h5 {
          font-size: 1.25rem;
        }

        p {
          opacity: 0.5;
        }

        button {
          font-family: var(--sans-serif);
          appearance: none;
          font-weight: 700;
          background: none;
          border: 0;
          border-radius: 0;
          color: var(--highlight);
          margin-left: 1rem;
        }
      `}
    </style>
  </div>
);

export default IndexPage;
