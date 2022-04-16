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
  return res.send(user);
};

const createView = async (req, res, uid) => {
  let users = await executeQuery(
    `CREATE VIEW infoUser AS SELECT * FROM userData WHERE uID = ${uid}`,
    []
  );
};

const updateProfileData = async (req, res, uid, name, status) => {
  let users = await executeQuery(
    `UPDATE userData SET name = "${name}", status = "${status}" WHERE uID = "${uid}"`,
    []
  );
  let user = await executeQuery(
    `select * from userData where uID = ${uid}`,
    []
  );
  res.send(user);
};

const updateProfilePic = async (req, res, uid, imgSrc) => {
  let users = await executeQuery(
    `UPDATE userData SET imgSrc = "${imgSrc}" WHERE uID = ${uid} `,
    []
  );
  let user = await executeQuery(
    `select * from userData where uID = ${uid}`,
    []
  );
  res.send(user);
};

const getArchived = async (req, res, uid) => {
  let archivedUsers = await executeQuery(
    `select archived from userData where uID = ${uid}`,
    []
  );
  res.send(archivedUsers);
};

const getBlocked = async (req, res, uid) => {
  let blockedUsers = await executeQuery(
    `select blocked from userData where uID = ${uid}`,
    []
  );
  res.send(blockedUsers);
};

const unArchiveUser = async (req, res, uid, uid2) => {
  let archivedUsers = await executeQuery(
    `select archived from userData where uID = ${uid}`,
    []
  );

  var archivedList = JSON.parse(archivedUsers[0].archived);
  var newList = archivedList.filter((item) => item != uid2);
  let updateArchive = await executeQuery(
    `update userData set archived = '[${newList}]' where uID = ${uid}`,
    []
  );
};

const unBlockUser = async (req, res, uid, uid2) => {
  let blockedUsers = await executeQuery(
    `select blocked from userData where uID = ${uid}`,
    []
  );
  var blockedList = JSON.parse(blockedUsers[0].blocked);
  var newList = blockedList.filter((item) => item != uid2);
  let updateBlock = await executeQuery(
    `update userData set blocked = '[${newList}]' where uID = ${uid}`,
    []
  );
};

const archiveUser = async (req, res, uid, uid2) => {
  let archivedUsers = await executeQuery(
    `select archived from userData where uID = ${uid}`,
    []
  );
  var archivedList = [JSON.parse(archivedUsers[0].archived)];
  if (uid2 && !archivedList.includes(uid2)) {
    var newList = [...archivedList, uid2];
    let updateArchive = await executeQuery(
      `update userData set archived = '[${newList}]' where uID = ${uid}`,
      []
    );
  }
};

const blockedUser = async (req, res, uid, uid2) => {
  let blockedUsers = await executeQuery(
    `select blocked from userData where uID = ${uid}`,
    []
  );
  var blockedList = [JSON.parse(blockedUsers[0].blocked)];
  if (uid2 && !blockedList.includes(uid2)) {
    var newList = [...blockedList, uid2];
    let updateBlock = await executeQuery(
      `update userData set blocked = '[${newList}]' where uID = ${uid}`,
      []
    );
  }
};

export {
  createUserData,
  updateProfileData,
  updateProfilePic,
  getArchived,
  getBlocked,
  unArchiveUser,
  unBlockUser,
  archiveUser,
  blockedUser,
  createView,
};
