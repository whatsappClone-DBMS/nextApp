import nc from "next-connect";
import { useRouter } from "next/router";
import { updateGroupData, updateGroupPic } from "../../controller/groupData";

function Handler(req, res) {
  const Handler = nc();
  const { gId, name, status, imgSrc } = req.query;
  if (imgSrc) {
    Handler.get(updateGroupPic(req, res, gId, imgSrc));
  }
  Handler.get(updateGroupData(req, res, gId, name, status));
  return Handler;
}

export default Handler;
