import { executeQuery } from "../../config/db";

const updateGroupData = async (req, res, gId, name, status) => {
  console.log("blah blah blah", name, status);
  let update = await executeQuery(
    `UPDATE userGroup SET gName = "${name}", gDesc = "${status}" WHERE gID = "${gId}"`,
    []
  );
  let group = await executeQuery(
    `select * from userGroup where gID = ${gId}`,
    []
  );
  res.send(group);
};

const updateGroupPic = async (req, res, gId, imgSrc) => {
  console.log("bc", imgSrc);
  let update = await executeQuery(
    `UPDATE userGroup SET imgSrc = "${imgSrc}" WHERE gID = ${gId} `,
    []
  );
  let group = await executeQuery(
    `select * from userGroup where gID = ${gId}`,
    []
  );
  res.send(group);
};

export {
  createUserData,
  updateGroupData,
  updateGroupPic,
  getArchived,
  getBlocked,
};
