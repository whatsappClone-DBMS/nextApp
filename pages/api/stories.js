import nc from "next-connect";
import { uploadStory, allStories } from "../../controller/users/stories";

function Handler(req, res) {
  const Handler = nc();
  const { uid, imgSrc } = req.query;
  if (uid && imgSrc) {
    Handler.get(uploadStory(req, res, uid, imgSrc));
  } else {
    Handler.get(allStories(req, res));
  }

  return Handler;
}

export default Handler;
