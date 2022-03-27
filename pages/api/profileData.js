import nc from "next-connect";
import { useRouter } from "next/router";
import { updateProfileData } from "../../controller/users/userData";

function Handler(req, res) {
  const Handler = nc();
  const { uid, name, status } = req.query;
  Handler.get(updateProfileData(req, res, uid, name, status));
  return Handler;
}

export default Handler;
