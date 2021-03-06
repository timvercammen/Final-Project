import React from "react";
import Layout from "../components/Layout";
import "../styles/styles.scss";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
