import nc from "next-connect";
import { useRouter } from "next/router";
import { createDm } from "../../controller/create";

function Handler(req, res) {
  const Handler = nc();
  const { uid1, uid2 } = req.query;
  Handler.get(createDm(req, res, uid1, uid2));
  return Handler;
}

export default Handler;
