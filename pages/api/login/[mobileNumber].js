import nc from "next-connect";
import { login } from "../../../controller/login";

function Handler(req, res) {
  const Handler = nc();
  const { mobileNumber } = req.query;
  Handler.get(login(req, res, mobileNumber));
  return Handler;
}

export default Handler;
