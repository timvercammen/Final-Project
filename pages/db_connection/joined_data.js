import React from "react";
import db, { nest } from "../../db";

const joined_data = ({ travels }) => {
  // console.log({ travels });
  return (
    <div>
      <main>
        <h1>Data with childtables</h1>
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
            <details key={trav_id}>
              <summary>
                {trav_name} (year: {trav_year})
              </summary>
              <ul>
                <li>
                  <p>Continent id: {trav_cont_id}</p>
                </li>
                <li>
                  <p>Longitude: {trav_long}</p>
                </li>
                <li>
                  <p>Latitude: {trav_lat}</p>
                </li>
                <li>
                  <p>Images:</p>
                  <ul>
                    {images.map(({ img_id, img_name, img_img }) => (
                      <li key={img_id}>
                        <p>{img_name}</p>
                        {img_img}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </details>
          )
        )}
      </main>
    </div>
  );
};

export default joined_data;

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
