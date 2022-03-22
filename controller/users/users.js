import { executeQuery } from "../../config/db";

const getAllUsers = async (req, res) => {
  let users = await executeQuery("select * from Users", []);
  res.send(users);
};
const getUser = async (req, res, uid) => {
  console.log("hi", uid);
  let users = await executeQuery(`select * from Users where uid = ${uid}`, []);
  res.send(users);
};

export { getAllUsers, getUser };
