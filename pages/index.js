import React from "react";
import Head from "next/head";
import Carousel from "../components/Carousel";

const index = () => {
  return (
    <>
      <Head>
        <title>AG Photography | home</title>
      </Head>
      <div className="carousel">
        <Carousel />
      </div>
    </>
  );
};

export default index;
