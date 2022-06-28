import db from "../../../db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db
      .select()
      .from("admins")
      .where("admin_id", req.query.admin_id);
    res.send(data);
  }
  if (req.method === "DELETE") {
    await db.delete().from("admins").where("admin_id", req.query.admin_id);
    const allAdmins = await db.select().from("admins");
    res.send(allAdmins);
  }
  if (req.method === "PATCH") {
    await db("admins").update(req.body).where("admin_id", req.query.admin_id);
    const allAdmins = await db.select().from("admins");
    res.send(allAdmins);
  }
};

export default handler;
