import { executeQuery } from "../config/db";

const allGroups = async (req, res, uid) => {
  let allGroups = await executeQuery(
    `select userGroups from userData where uID = ${uid}`,
    []
  );
  return res.status(200).send(allGroups);
};

const oneGroup = async (req, res, gId) => {
  let oneGroup = await executeQuery(
    `select * from userGroup where gID = ${gId}`,
    []
  );

  return res.status(200).send(oneGroup);
};

const updateDmArrayGroups = async (req, res, dmId, mId) => {
  let getArray = await executeQuery(
    "SELECT chatHistory FROM DM WHERE dmID = " + `${dmId}`,
    []
  );
  console.log("blah", getArray);

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

export { allGroups, updateDmArrayGroups, oneGroup };
