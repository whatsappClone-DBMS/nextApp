import { executeQuery } from "../config/db";

const allDMs = async (req, res, uid) => {
  console.log("uiddddd", uid);
  let allDms = await executeQuery(
    "SELECT * FROM DM WHERE uid1= " + `${uid}` + " OR uid2= " + `${uid}`,
    []
  );
  return res.status(200).json(allDms);
};

const oneDM = async (req, res, dmId) => {
  console.log("uiddddd", dmId);
  let oneDm = await executeQuery(
    "SELECT * FROM DM WHERE dmID= " + `${dmId}`,
    []
  );
  return res.status(200).json(oneDm);
};

const updateDmArray = async (req, res, dmId, mId) => {
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
  // res.status(200).json(putArray);
  return;
};

const allMessages = async (req, res, mId) => {
  console.log("middddd", mId);
  let allMessages = await executeQuery(
    "SELECT * FROM Messages WHERE mID= " + `${mId}`,
    []
  );
  return res.status(200).json(allMessages);
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
  console.log("getHeaders", res.getHeaders());
  return res.status(200).json(mId);
};

const getMessage = async (req, res, time) => {
  console.log("getting messageee");
  let mId = await executeQuery(
    "SELECT mID FROM Messages WHERE time = " + `"${time}"`,
    []
  );
  return res.status(200).json(mId);
};

export { allDMs, oneDM, allMessages, createMessage, updateDmArray, getMessage };
