import db from "../../../db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db.select().from("travels");
    res.send(data);
  }
  if (req.method === "POST") {
    await db("travels").insert(req.body);
    const updatedData = await db.select().from("travels");
    res.send(updatedData);
  }
};

export default handler;
