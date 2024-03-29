import Link from "next/link";
import { Avatar } from "./named-avatar";

interface ContactCardProps {
  name: string;
  city: string;
  id: string;
}

export const ContactCard = ({ name, city, id }: ContactCardProps) => {
  return (
    <div className="card">
      <div className="card-content">
        <Avatar>
          <span>{name[0]}</span>
        </Avatar>
        <div>
          <h5>{name}</h5>

          <p className="city">{city}</p>
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
    </div>
  );
};
