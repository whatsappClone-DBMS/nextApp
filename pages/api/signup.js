import nc from "next-connect";
import { useRouter } from "next/router";
import { createUser } from "../../controller/users/users";

function Handler(req, res) {
  const Handler = nc();
  const { mobileNumber, password } = req.query;
  Handler.get(createUser(req, res, mobileNumber, password));
  return Handler;
}

export default Handler;
