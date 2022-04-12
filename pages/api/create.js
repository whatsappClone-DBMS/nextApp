import nc from "next-connect";
import { useRouter } from "next/router";
import { createDm, createGroup } from "../../controller/create";

function Handler(req, res) {
  const Handler = nc();
  const { uid1, uid2, members, name } = req.query;
  if (uid1 && uid2) {
    Handler.get(createDm(req, res, uid1, uid2));
  } else {
    Handler.get(createGroup(req, res, name, members));
  }

  return Handler;
}

export default Handler;
