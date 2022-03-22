import { executeQuery } from "../../config/db";

const getAllUsers = async (req, res) => {
  let users = await executeQuery("select * from Users", []);
  res.send(users);
};

export { getAllUsers };
