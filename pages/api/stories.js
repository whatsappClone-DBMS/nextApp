import nc from "next-connect";
import { uploadStory, allStories } from "../../controller/users/stories";

function Handler(req, res) {
  const Handler = nc();
  const { uid, imgSrc, time } = req.query;
  if (uid && imgSrc && time) {
    Handler.get(uploadStory(req, res, uid, imgSrc, time));
  } else {
    Handler.get(allStories(req, res));
  }

  return Handler;
}

export default Handler;
