import { executeQuery } from "../../config/db";

const createUserData = async (req, res, uid, name) => {
  let users = await executeQuery(
    "INSERT into userData(uID, name)" + ` Values("${uid}", "${name}")`,
    []
  );
  let user = await executeQuery(
    `select * from userData where uID = ${uid}`,
    []
  );
  res.status(200).send(user);
};

const updateProfileData = async (req, res, uid, name, status) => {
  console.log("blah blah blah", name, status);
  let users = await executeQuery(
    `UPDATE userData SET name = "${name}", status = "${status}" WHERE uID = "${uid}"`,
    []
  );
  let user = await executeQuery(
    `select * from userData where uID = ${uid}`,
    []
  );
  res.status(200).send(user);
};

const updateProfilePic = async (req, res, uid, imgSrc) => {
  console.log("bc", imgSrc)
  let users = await executeQuery(
    `UPDATE userData SET imgSrc = "${imgSrc}" WHERE uID = ${uid} `,
    []
  );
  let user = await executeQuery(
    `select * from userData where uID = ${uid}`,
    []
  );
  res.status(200).send(user);
};

export { createUserData, updateProfileData, updateProfilePic };
