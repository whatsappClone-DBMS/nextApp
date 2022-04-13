import { executeQuery } from "../config/db";

const allDMs = async (req, res, uid) => {
  let allDms = await executeQuery(
    "SELECT * FROM DM WHERE uid1= " + `${uid}` + " OR uid2= " + `${uid}`,
    []
  );
  return res.status(200).send(allDms);
};

const oneDM = async (req, res, dmId) => {
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

  const finalHistory = [...JSON.parse(getArray[0].chatHistory), parseInt(mId)];
  let putArray = await executeQuery(
    `UPDATE DM SET chatHistory = "${JSON.stringify(
      finalHistory
    )}" WHERE dmID = ${dmId}`,
    []
  );

  // res.status(200).send(putArray);
  return;
};

const allMessages = async (req, res, mId) => {
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

  let mId = await executeQuery(
    "SELECT mID FROM Messages WHERE time = " + `"${time}"`,
    []
  );

  let getArray = await executeQuery(
    "SELECT chatHistory FROM DM WHERE dmID= " + `${dmId}`,
    []
  );

  var finalHistory = [];
  if (mId) {
    finalHistory = [
      ...JSON.parse(getArray[0].chatHistory),
      parseInt(mId[0].mID),
    ];
  } else {
    finalHistory = JSON.parse(getArray[0].chatHistory);
  }

  let putArray = await executeQuery(
    `UPDATE DM SET chatHistory = "${JSON.stringify(
      finalHistory
    )}" WHERE dmID = ${dmId}`,
    []
  );

  // return res.send(putArray);
};

const getMessage = async (req, res, time) => {
  let mId = await executeQuery(
    "SELECT mID FROM Messages WHERE time = " + `"${time}"`,
    []
  );
  return res.status(200).send(mId);
};

const deleteMessage = async (req, res, dmId, mId) => {
  let getArray = await executeQuery(
    "SELECT chatHistory FROM DM WHERE dmID= " + `${dmId}`,
    []
  );

  var finalHistory = JSON.parse(getArray[0].chatHistory);
  var final = finalHistory.filter((item) => item != mId);
  let putArray = await executeQuery(
    `UPDATE DM SET chatHistory = "${JSON.stringify(
      final
    )}" WHERE dmID = ${dmId}`,
    []
  );
  return res.status(200).send(putArray);
};

const createGroupMessage = async (
  req,
  res,
  sender,
  receiver,
  text,
  date,
  time,
  gId
) => {
  let message = await executeQuery(
    `INSERT into Messages(sender, receiver, text, date, time) Values(
      "${sender}", "${receiver}", "${text}", "${date}", "${time}")`,
    []
  );

  let mId = await executeQuery(
    "SELECT mID FROM Messages WHERE time = " + `"${time}"`,
    []
  );

  let getArray = await executeQuery(
    "SELECT chatHistory FROM userGroup WHERE gID= " + `${gId}`,
    []
  );

  var finalHistory = [];
  if (mId) {
    finalHistory = [
      ...JSON.parse(getArray[0].chatHistory),
      parseInt(mId[0].mID),
    ];
  } else {
    finalHistory = JSON.parse(getArray[0].chatHistory);
  }

  let putArray = await executeQuery(
    `UPDATE userGroup SET chatHistory = "${JSON.stringify(
      finalHistory
    )}" WHERE gID = ${gId}`,
    []
  );

  // return res.send(putArray);
};

export {
  allDMs,
  oneDM,
  allMessages,
  createMessage,
  updateDmArray,
  getMessage,
  deleteMessage,
  createGroupMessage,
};
