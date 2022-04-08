import { executeQuery } from "../config/db";

const allDMs = async (req, res, uid) => {
  console.log("uiddddd", uid);
  let allDms = await executeQuery(
    "SELECT * FROM DM WHERE uid1= " + `${uid}` + " OR uid2= " + `${uid}`,
    []
  );
  return res.status(200).send(allDms);
};

const oneDM = async (req, res, dmId) => {
  console.log("uiddddd", dmId);
  let oneDm = await executeQuery(
    "SELECT * FROM DM WHERE dmID= " + `${dmId}`,
    []
  );
  return res.status(200).send(oneDm);
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
  // res.status(200).send(putArray);
  return;
};

const allMessages = async (req, res, mId) => {
  console.log("middddd", mId);
  let allMessages = await executeQuery(
    "SELECT * FROM Messages WHERE mID= " + `${mId}`,
    []
  );
  return res.status(200).send(allMessages);
};

const createMessage = async (
  req,
  res,
  sender,
  receiver,
  text,
  date,
  time,
  dmId
) => {
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
  let getArray = await executeQuery(
    "SELECT chatHistory FROM DM WHERE dmID= " + `${dmId}`,
    []
  );
  console.log(JSON.parse(getArray[0].chatHistory));
  console.log("2", parseInt(mId));
  const finalHistory = [];
  if (parseInt(mId)) {
    finalHistory = [...JSON.parse(getArray[0].chatHistory), parseInt(mId)];
  } else {
    finalHistory = JSON.parse(getArray[0].chatHistory);
  }

  let putArray = await executeQuery(
    `UPDATE DM SET chatHistory = "${JSON.stringify(
      finalHistory
    )}" WHERE dmID = ${dmId}`,
    []
  );
  console.log("wqe", finalHistory.toString());

  return res.send(putArray);
};

const getMessage = async (req, res, time) => {
  console.log("getting messageee");
  let mId = await executeQuery(
    "SELECT mID FROM Messages WHERE time = " + `"${time}"`,
    []
  );
  return res.status(200).send(mId);
};

export { allDMs, oneDM, allMessages, createMessage, updateDmArray, getMessage };
