import { executeQuery } from "../config/db";

const allDMs = async (req, res, uid) => {
  console.log("uiddddd", uid);
  let allDms = await executeQuery(
    "SELECT * FROM DM WHERE uid1= " + `${uid}` + " OR uid2= " + `${uid}`,
    []
  );
  res.send(allDms);
  return;
};

const oneDM = async (req, res, dmId) => {
  console.log("uiddddd", dmId);
  let oneDm = await executeQuery(
    "SELECT * FROM DM WHERE dmID= " + `${dmId}`,
    []
  );
  res.send(oneDm);
  return;
};

const updateDmArray = async (req, res, dmId, mId) => {
  console.log("getArray");
  let getArray = await executeQuery(
    "SELECT chatHistory FROM DM WHERE dmID= " + `${dmId}`,
    []
  );
  console.log(JSON.parse(getArray[0].chatHistory));
  console.log(JSON.stringify(mId));
  const finalHistory = [...JSON.parse(getArray[0].chatHistory), parseInt(mId)];
  let putArray = await executeQuery(
    `UPDATE DM SET chatHistory = "${JSON.stringify(
      finalHistory
    )}" WHERE dmID = ${dmId}`,
    []
  );
  console.log("wqe", finalHistory.toString());
  // res.send(putArray);
  return;
};

const allMessages = async (req, res, mId) => {
  console.log("middddd", mId);
  let allMessages = await executeQuery(
    "SELECT * FROM Messages WHERE mID= " + `${mId}`,
    []
  );
  res.send(allMessages);
  return;
};

const createMessage = async (req, res, sender, receiver, text, date, time) => {
  let message = await executeQuery(
    `INSERT into Messages(sender, receiver, text, date, time) Values(
      "${sender}", "${receiver}", "${text}", "${date}", "${time}")`,
    []
  );
  console.log("abcdefg", message);
  let mId = await executeQuery(
    "SELECT mID FROM Messages WHERE time = " + `"${time}"`,
    []
  );
  console.log("bcccc", mId);
  res.send(mId);
  return;
};

const getMessage = async (req, res, time) => {
  console.log("getting messageee");
  let mId = await executeQuery(
    "SELECT mID FROM Messages WHERE time = " + `"${time}"`,
    []
  );
  res.send(mId);
  return;
};

export { allDMs, oneDM, allMessages, createMessage, updateDmArray, getMessage };
