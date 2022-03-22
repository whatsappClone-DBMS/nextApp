import { executeQuery } from "../../config/db";

const createUserData = async (req, res, uid, name) => {
  let users = await executeQuery(
    `INSERT into UserData(uID, name) Values(${name}) `,
    []
  );
  let user = await executeQuery(
    `select * from UserData where uID = ${uid}`,
    []
  );
  res.status(200).send(user);
};

export { createUserData };
