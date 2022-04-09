import nc from "next-connect";
import {
  allMessages,
  createMessage,
  getMessage,
  createGroupMessage,
} from "../../../controller/chats";

function Handler(req, res) {
  const Handler = nc();
  const { mId, sender, receiver, text, date, time, dmId, gId } = req.query;
  if (mId) {
    Handler.get(allMessages(req, res, mId));
  } else if (time && !sender && !receiver && !text && !date) {
    Handler.get(getMessage(req, res, time));
  } else if (gId) {
    Handler.get(
      createGroupMessage(req, res, sender, receiver, text, date, time, gId)
    );
  } else {
    Handler.get(
      createMessage(req, res, sender, receiver, text, date, time, dmId)
    );
  }
  return Handler;
}

export default Handler;
