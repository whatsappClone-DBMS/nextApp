import { executeQuery } from "../../config/db";

const getAllUsers = async (req, res) => {
  let users = await executeQuery("select * from Users", []);
  res.send(users);
};
const getUserDetails = async (req, res, uid) => {
  console.log("hi2", uid);
  let users = await executeQuery(
    `select * from UserData where uID = ${uid}`,
    []
  );
  res.send(users);
};
const createUser = async (req, res, mobileNumber, password) => {
  console.log("mobileNumber", mobileNumber);
  let users = await executeQuery(
    `INSERT into Users(mobileNumber,password) Values(${mobileNumber},${password})`,
    []
  );
  res.send(users);
};

const perUser = async (req, res, uid) => {
  let users = await executeQuery(`select * from Users where uID = ${uid}`, []);
  res.send(users);
};

export { getAllUsers, getUserDetails, createUser, perUser };
