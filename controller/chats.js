import { executeQuery } from "../config/db";

const allDMs = async (req, res, uid) => {
  console.log("uiddddd", uid);
  let userCredentials = await executeQuery(
    "SELECT * FROM DM WHERE uid1= " + `${uid}` + " OR uid2= " + `${uid}`,
    []
  );
  res.send(userCredentials);
};

const oneDM = async (req, res, dmId) => {
  console.log("uiddddd", dmId);
  let userCredentials = await executeQuery(
    "SELECT * FROM DM WHERE dmID= " + `${dmId}`,
    []
  );
  res.send(userCredentials);
};

const allMessages = async (req, res, mId) => {
  console.log("middddd", mId);
  let userCredentials = await executeQuery(
    "SELECT * FROM Messages WHERE mID= " + `${mId}`,
    []
  );
  res.send(userCredentials);
};

export { allDMs, oneDM, allMessages };
