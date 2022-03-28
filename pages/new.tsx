import Head from "next/head";
import { Form, defaultValues } from "../components/contact-editor";

const New = () => {
  return (
    <div>
      <Head>
        <title>New Person</title>
      </Head>
      <header>
        <h1>Add New Contact</h1>
      </header>

      <div data-testid="NEW_FORM">
        <Form formId="add-person-form" initialValues={defaultValues} />
      </div>
    </div>
  );
};

export default New;
