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

const updateDmArray = async (req, res, dmId, mId) => {
  let getArray = await executeQuery(
    "SELECT chatHistory FROM DM WHERE dmID= " + `${dmId}`,
    []
  );
  const finalHistory = [...JSON.parse(getArray), mId];
  let getArray = await executeQuery(
    `UPDATE DM SET chatHistory = "${finalHistory}" WHERE dmID = ${dmId}`,
    []
  );
  res.send(getArray);
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
  let mId = await executeQuery(
    "SELECT mID FROM Messages WHERE time= " + `${time}`,
    []
  );
  res.send(mId);
};

export { allDMs, oneDM, allMessages, createMessage, updateDmArray };
