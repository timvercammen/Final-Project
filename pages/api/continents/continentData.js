import db from "../../../db";

export default async function continentData(req, res) {
  const continentQuery = await db("continents").select(
    "continents.cont_id",
    "continents.cont_name"
  );
  res.send(continentQuery);
}
