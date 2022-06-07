import db from "../../../db";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;
  if (req.method === "GET") {
    res.send(await db.select("*").from("travels").where({ id }));
  }
  if (req.method === "DELETE") {
    res.send(await db("travels").where({ id }).del());
  }
  if (req.method === "PATCH") {
    res.send(await db("travels").where({ id }).update(req.body));
  }
}
