import "../styling/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/molecules/Layout";
import { CursorProvider } from "@/context/CursorContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CursorProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CursorProvider>
  );
}

export default MyApp;
