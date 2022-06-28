import db from "../../../db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db
      .select()
      .from("travels")
      .where("trav_id", req.query.trav_id)
      .leftJoin("images", "trav_id", "=", "images.img_trav_id");
    res.send(data);
  }
  if (req.method === "DELETE") {
    await db.delete().from("travels").where("trav_id", req.query.trav_id);
    const allTravels = await db.select().from("travels");
    res.send(allTravels);
  }
  if (req.method === "PATCH") {
    await db("travels").update(req.body).where("trav_id", req.query.trav_id);
    const allTravels = await db.select().from("travels");
    res.send(allTravels);
  }
};

export default handler;
