import Link from "next/link";
import { Avatar } from "./named-avatar";

export const ContactCard: React.VFC<{
  name: string;
  city: string;
  id: string;
}> = ({ name, city, id }) => {
  return (
    <div className="card">
      <div className="card-content">
        <Avatar>{name[0]}</Avatar>
        <div>
          <h5>{name}</h5>

          <p>{city}</p>
        </div>
      </div>
      <div className="card-actions">
        <Link href="/[id]/edit" as={`/${id}/edit`} passHref>
          <button>Edit</button>
        </Link>
        <Link href="/[id]" as={`/${id}`} passHref>
          <button>Details</button>
        </Link>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};
