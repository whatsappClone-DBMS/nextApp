import { executeQuery } from "../config/db";

const dm = async (req, res, uid) => {
  console.log("uiddddd", uid);
  let userCredentials = await executeQuery(
    "SELECT * FROM DM WHERE uid1= " + `${uid}` + " OR uid2= " + `${uid}`,
    []
  );
  res.send(userCredentials);
};

export { dm };
