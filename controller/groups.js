import { executeQuery } from "../config/db";

const allGroups = async (req, res, uid) => {
  console.log("uiddddd", uid);
  let allDms = await executeQuery(
    "SELECT * FROM userGroup WHERE uid1= " + `${uid}` + " OR uid2= " + `${uid}`,
    []
  );
  return res.status(200).send(allDms);
};

const oneGroup = async (req, res, dmId) => {
  console.log("uiddddd", dmId);
  let oneDm = await executeQuery(
    "SELECT * FROM DM WHERE dmID= " + `${dmId}`,
    []
  );
  return res.status(200).send(oneDm);
};

const updateDmArrayGroups = async (req, res, dmId, mId) => {
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

export { allGroups, updateDmArrayGroups, oneGroup };
