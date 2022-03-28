import type { AppProps } from "next/app";
import { PageLayout } from "../components/layout";
import "../components/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
