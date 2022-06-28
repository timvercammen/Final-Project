import db from "../../../db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db
      .select()
      .from("travels")
      .leftJoin("images", "trav_id", "=", "images.img_trav_id")
      .limit(1);
    res.send(data);
  }
};

export default handler;
