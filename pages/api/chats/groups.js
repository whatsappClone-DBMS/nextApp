import nc from "next-connect";
import {
  allGroups,
  updateDmArrayGroups,
  oneGroup,
} from "../../../controller/groups";

function Handler(req, res) {
  const Handler = nc();
  const { uid, gId, mId } = req.query;

  if (uid) {
    Handler.get(allGroups(req, res, uid));
  } else if (gId && mId) {
    console.log("dmId and Mid");
    Handler.get(updateDmArrayGroups(req, res, gId, mId));
  } else if (gId) {
    Handler.get(oneGroup(req, res, gId));
  }

  return Handler;
}

export default Handler;
