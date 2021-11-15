import Head from "next/head";
import Link from "next/link";

const AboutPage = () => (
  <div>
    <Head>
      <title>About | Next.js + TypeScript Example</title>
    </Head>
    <h1 data-testid="ABOUT_TITLE" className="text-3xl font-bold mb-8">
      About
    </h1>
    <section className="prose prose-lg">
      <p>This is the about page</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </section>
  </div>
);

export default AboutPage;
