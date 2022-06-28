import db from "../../../db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.send(await db.select("*").from("continents"));
  }
}
