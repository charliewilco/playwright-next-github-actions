import Head from "next/head";
import { Form, defaultValues } from "../components/Form";

const New = () => {
  return (
    <div>
      <Head>
        <title>New Person</title>
      </Head>
      <header className="py-4">
        <h1 className="text-2xl font-bold">Add New Contact</h1>
      </header>

      <div data-testid="NEW_FORM">
        <Form formId="add-person-form" initialValues={defaultValues} />
      </div>
    </div>
  );
};

export default New;
