import { executeQuery } from "../config/db";

const allDMs = async (req, res, uid) => {
  console.log("uiddddd", uid);
  let allDms = await executeQuery(
    "SELECT * FROM DM WHERE uid1= " + `${uid}` + " OR uid2= " + `${uid}`,
    []
  );
  res.send(allDms);
};

const oneDM = async (req, res, dmId) => {
  console.log("uiddddd", dmId);
  let oneDm = await executeQuery(
    "SELECT * FROM DM WHERE dmID= " + `${dmId}`,
    []
  );
  res.send(oneDm);
};

const allMessages = async (req, res, mId) => {
  console.log("middddd", mId);
  let allMessages = await executeQuery(
    "SELECT * FROM Messages WHERE mID= " + `${mId}`,
    []
  );
  res.send(allMessages);
};

const createMessage = async (req, res, sender, receiver, text, date, time) => {
  let message = await executeQuery(
    `INSERT into Messages(sender, receiver, text, date, time) Values(
      "${sender}", "${receiver}", "${text}", "${date}", "${time}")`,
    []
  );
  res.send(message);
};

export { allDMs, oneDM, allMessages, createMessage };
