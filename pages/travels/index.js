import React from "react";
import db, { nest } from "../../db";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const travelsQuery = await db("travels")
    .leftJoin("images", "travels.trav_id", "=", "images.img_trav_id")
    .select(
      "travels.trav_id AS trav_id",
      "travels.trav_name AS trav_name",
      "travels.trav_year AS trav_year",
      "images.img_id AS img_id",
      "images.img_name AS img_name",
      "images.img_url AS img_url"
    );

  const travelsDefinition = [
    {
      trav_id: { column: "trav_id", type: "NUMBER" },
      trav_name: "trav_name",
      trav_year: { column: "trav_year", type: "NUMBER" },
      images: [
        {
          img_id: { column: "img_id", type: "NUMBER" },
          img_name: "img_name",
          img_url: "img_url",
        },
      ],
    },
  ];
  const travels = nest(travelsQuery, travelsDefinition);

  return {
    props: {
      travels,
    },
  };
};

const Index = ({ travels }) => {
  return (
    <>
      <section className="containermap">
        {travels.map(
          ({
            trav_id,
            trav_name,
            trav_year,
            trav_info,
            trav_cont_id,
            trav_long,
            trav_lat,
            images,
          }) => (
            <article className="containermap__card" key={trav_id}>
              <Link href={`/travels/${trav_id}`}>
                <a>
                  {images && images.length !== 0 && (
                    <img
                      className="containermap__card__img"
                      src={images[0].img_url}
                      alt="/img/fallback.jpg"
                    />
                  )}
                  <p className="containermap__card__title">
                    {trav_name} - {trav_year}
                  </p>
                </a>
              </Link>
            </article>
          )
        )}
      </section>
    </>
  );
};

export default Index;
