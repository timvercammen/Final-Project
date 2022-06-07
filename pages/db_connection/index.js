import React from "react";
import db from "../../db";
import { parse } from "../../helpers";

const Index = ({ travels }) => {
  return (
    <div>
      <h1>MySQL data</h1>
      <pre>{JSON.stringify(travels, null, 2)}</pre>
    </div>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const travels = parse(await db.select("*").from("travels"));
  return {
    props: {
      travels,
    },
  };
};
