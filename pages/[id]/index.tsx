import { useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { dbConnect } from "../../db/connect";
import { PersonModel, ConvertedPerson } from "../../db/models";
import { Avatar } from "../../components/named-avatar";

export const getServerSideProps: GetServerSideProps<
  { person?: ConvertedPerson | null },
  { id: string }
> = async ({ params }) => {
  await dbConnect();

  if (params?.id) {
    const person = await PersonModel.findById(params.id).lean();
    if (person !== null) {
      person._id = person._id.toString();
    }

    return { props: { person } };
  }

  return { props: { person: null } };
};

const DetailsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ person }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const id = router.query.id;

    try {
      await fetch(`/api/people/${id}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the person.");
    }
  };

  if (!person) {
    return <h1>Not found</h1>;
  }

  const title = person.name + " | Edit";

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <div>
          <Avatar>{person.name[0]}</Avatar>
          <h1>{person.name}</h1>
        </div>
        <div>
          <Link href="/[id]/edit" as={`/${person._id}/edit`} passHref>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </header>

      <div className="card">
        <div className="grid">
          <div>
            <p>{person.age}</p>
            <span className="label">Age</span>
          </div>
          <div>
            <p>{person.city}</p>
            <span className="label">City</span>
          </div>
          <div>
            <p>N/A</p>
            <span className="label">Phone #</span>
          </div>
        </div>
      </div>

      {message && <p>{message}</p>}

      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        header > div {
          display: flex;
          align-items: center;
        }

        h1 {
          margin: 0 0 0 1rem;
        }

        p {
          font-size: 1.5rem;
        }

        .label {
          display: block;
          font-family: var(--monospace);
        }

        .grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr 1fr;
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
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default DetailsPage;
