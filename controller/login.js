import { executeQuery } from "../config/db";

const login = async (req, res, mobileNumber) => {
  console.log("number", mobileNumber);
  let userCredentials = await executeQuery(
    `select * from Users where mobileNumber = ${mobileNumber}`,
    []
  );
  res.send(userCredentials);
};

export { login };
