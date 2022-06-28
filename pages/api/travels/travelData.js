// import React from "react";
// import db from "../../../db";

// export default async function Test(req, res) {
//   const travelsQuery = await db("travels")
//     .leftJoin("images", "travels.trav_id", "=", "images.img_trav_id")
//     .select(
//       "travels.trav_id",
//       "travels.trav_name",
//       "travels.trav_year",
//       "travels.trav_lat",
//       "travels.trav_long",
//       "travels.trav_cont_id",
//       "images.img_id",
//       "images.img_name",
//       "images.img_img"
//     );
//   res.send(travelsQuery);

//   const travelsDefinition = [
//     {
//       trav_id: { column: "trav_id", type: "NUMBER" },
//       trav_name: "trav_name",
//       trav_year: { column: "trav_year", type: "NUMBER" },
//       trav_long: { column: "trav_long", typer: "NUMBER" },
//       trav_lat: { column: "trav_lat", typer: "NUMBER" },
//       trav_cont_id: { column: "trav_cont_id", typer: "NUMBER" },
//       images: [
//         {
//           img_id: { column: "img_id", type: "NUMBER" },
//           img_name: "img_name",
//           img_img: "img_img",
//         },
//       ],
//     },
//   ];

//   const travels = nest(travelsQuery, travelsDefinition);

//   console.log(travels);
//   return {
//     props: {
//       travels,
//     },
//   };
// }
