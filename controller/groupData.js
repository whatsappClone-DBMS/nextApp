import { executeQuery } from "../config/db";

const updateGroupData = async (req, res, gId, name, status) => {
  let update = await executeQuery(
    `UPDATE userGroup SET gName = "${name}", gDesc = "${status}" WHERE gID = "${gId}"`,
    []
  );
  let group = await executeQuery(
    `select * from userGroup where gID = ${gId}`,
    []
  );
};

const updateGroupPic = async (req, res, gId, imgSrc) => {
  let update = await executeQuery(
    `UPDATE userGroup SET imgSrc = "${imgSrc}" WHERE gID = ${gId} `,
    []
  );
  let group = await executeQuery(
    `select * from userGroup where gID = ${gId}`,
    []
  );
};

export { updateGroupData, updateGroupPic };
