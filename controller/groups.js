import { executeQuery } from "../config/db";

const allGroups = async (req, res, uid) => {
  console.log("uiddddd", uid);
  let allGroups = await executeQuery(
    `select userGroups from userData where uID = ${uid}`,
    []
  );
  return res.status(200).send(allGroups);
};

const oneGroup = async (req, res, gId) => {
  console.log("uiddddd", gId);
  let oneGroup = await executeQuery(
    "SELECT * FROM userGroups WHERE gID= " + `${gId}`,
    []
  );
  return res.status(200).send(oneGroup);
};

const updateDmArrayGroups = async (req, res, dmId, mId) => {
  let getArray = await executeQuery(
    "SELECT chatHistory FROM DM WHERE dmID = " + `${dmId}`,
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

export { allGroups, updateDmArrayGroups, oneGroup };
