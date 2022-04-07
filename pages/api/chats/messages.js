import nc from "next-connect";
import {
  allMessages,
  createMessage,
  getMessage,
} from "../../../controller/chats";

function Handler(req, res) {
  const Handler = nc();
  res.removeHeader("x-powered-by");
  res.removeHeader("set-cookie");
  res.removeHeader("Date");
  res.removeHeader("Connection");
  res.removeHeader('cache-control');
  res.removeHeader('etag');
  res.removeHeader('content-type');
  res.removeHeader('vary');
  res.removeHeader('content-encoding');
  const { mId, sender, receiver, text, date, time } = req.query;
  if (mId) {
    Handler.get(allMessages(req, res, mId));
  } else if (time && !sender && !receiver && !text && !date) {
    Handler.get(getMessage(req, res, time));
  } else {
    Handler.get(createMessage(req, res, sender, receiver, text, date, time));
  }
  return Handler;
}

export default Handler;
