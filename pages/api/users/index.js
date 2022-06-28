import db from "../../../db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db.select().from("admins");
    res.send(data);
  }
  if (req.method === "POST") {
    await db("admins").insert(req.body);
    const updatedData = await db.select().from("admins");
    res.send(updatedData);
  }
};

export default handler;
