import nc from "next-connect";
import { useRouter } from "next/router";
import {
  updateProfileData,
  updateProfilePic,
} from "../../controller/users/userData";

function Handler(req, res) {
  const Handler = nc();
  const { uid, name, status, imgSrc } = req.query;
  if (imgSrc) {
    Handler.get(updateProfilePic(req, res, uid, imgSrc));
  }
  Handler.get(updateProfileData(req, res, uid, name, status));
  return Handler;
}

export default Handler;
