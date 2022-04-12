import { executeQuery } from "../config/db";

const createDm = async (req, res, uid1, uid2) => {
  let insert = await executeQuery(
    `INSERT into DM(uid1, uid2,chatHistory) Values("${uid1}", "${uid2}","[]")`,
    []
  );
  let dm = await executeQuery(
    `Select dmID from DM where uid1=${uid1} and uid2 = ${uid2}`,
    []
  );
  res.send(dm[0].dmID);
};

const createGroup = async (req, res, name, members) => {
  let insert = await executeQuery(
    `INSERT into userGroup(gName, imgSrc, gDesc, gMembers) Values("${name}", " ", " ", "[${members}]")`,
    []
  );
  console.log("membersss", members);
  let group = await executeQuery(
    `Select gID from userGroup where gMembers=[${members}]`,
    []
  );
  console.log("group", group);
  res.send(group[0].gID);
};

export { createDm, createGroup };
