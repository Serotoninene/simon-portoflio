import "../styling/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/molecules/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;