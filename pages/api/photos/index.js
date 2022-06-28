import db from "../../../db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db.select().from("images");
    res.send(data);
  }
  if (req.method === "POST") {
    await db("images").insert(req.body);
    const updatedData = await db.select().from("images");
    res.send(updatedData);
  }
};

export default handler;
