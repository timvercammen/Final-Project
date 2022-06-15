import { useState } from "react";
import Head from "next/head";
import db, { nest } from "../../db.js";
import Card from "../../components/Card.jsx";
import Link from "next/link.js";

const Travel = ({ travels }) => {
  console.log({ travels });

  const [status, setStatus] = useState(undefined);

  const handleClick = (e) => {
    if (status && status == e.target.dataset.status) {
      setStatus(undefined);
    } else {
      setStatus(e.target.dataset.status);
    }
  };

  return (
    <>
      <Head>
        <title>AG Photography | travels</title>
      </Head>
      <list />
      <div>
        <div className="selector">
          <button
            className={`selector__btn1 ${status == "0" ? "isActive" : ""}`}
            onClick={handleClick}
            data-status="0"
          >
            MAP
          </button>
          <button
            className={`selector__btn2 ${status == "-1" ? "isActive" : ""}`}
            onClick={handleClick}
            data-status="-1"
          >
            LIST
          </button>
        </div>
      </div>
      <div className="container">
        {travels.map(
          ({
            trav_id,
            trav_name,
            trav_year,
            trav_cont_id,
            trav_long,
            trav_lat,
            images,
          }) => (
            <Card
              trav_id={trav_id}
              trav_name={trav_name}
              trav_year={trav_year}
            />
          )
        )}
      </div>
    </>
  );
};

export default Travel;

export const getServerSideProps = async (context) => {
  const travelsQuery = await db("travels")
    .leftJoin("images", "travels.trav_id", "=", "images.img_trav_id")
    .select(
      "travels.trav_id AS trav_id",
      "travels.trav_name AS trav_name",
      "travels.trav_year AS trav_year",
      "travels.trav_lat AS trav_lat",
      "travels.trav_long AS trav_long",
      "travels.trav_cont_id AS trav_cont_id",
      "images.img_id AS img_id",
      "images.img_name AS img_name",
      "images.img_img AS img_img"
    );

  const travelsDefinition = [
    {
      trav_id: { column: "trav_id", type: "NUMBER" },
      trav_name: "trav_name",
      trav_year: { column: "trav_year", type: "NUMBER" },
      trav_long: { column: "trav_long", typer: "NUMBER" },
      trav_lat: { column: "trav_lat", typer: "NUMBER" },
      trav_cont_id: { column: "trav_cont_id", typer: "NUMBER" },
      images: [
        {
          img_id: { column: "img_id", type: "NUMBER" },
          img_name: "img_name",
          img_img: "img_img",
        },
      ],
    },
  ];

  const travels = nest(travelsQuery, travelsDefinition);

  console.log(travels);
  return {
    props: {
      travels,
    },
  };
};
