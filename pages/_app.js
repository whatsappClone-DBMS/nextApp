import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/assets/Icon.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
