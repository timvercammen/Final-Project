import db from "../../../db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db
      .select()
      .from("images")
      .where("img_id", req.query.img_id);
    res.send(data);
  }
  if (req.method === "DELETE") {
    await db.delete().from("images").where("img_id", req.query.img_id);
    const allImages = await db.select().from("images");
    res.send(allImages);
  }
  if (req.method === "PATCH") {
    await db("images").update(req.body).where("img_id", req.query.img_id);
    const allImages = await db.select().from("images");
    res.send(allImages);
  }
};

export default handler;
