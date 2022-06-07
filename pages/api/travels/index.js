import db from "../../../db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.send(await db.select("*").from("travels"));
  }
  if (req.method === "POST") {
    res.send(await db.insert(req.body).into("travels"));
  }
}
