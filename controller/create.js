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
    `INSERT into userGroup(gName, gMembers) Values("${name}","[${members}]")`,
    []
  );
  console.log("membersss", members);
  let group = await executeQuery(
    `Select gID from userGroup where gMembers=[${members}]`,
    []
  );
  console.log("group", group);
  members.map((uid) => {
    let GroupArray = await executeQuery(
      `Select userGroups from userData where uid=${uid}`,
      []
    );
    if(GroupArray[0]){
      console.log("GroupArray", GroupArray[0].userGroups);
      newlist  = [...JSON.parse(GroupArray[0].userGroups), group[0].gID];
      let update = await executeQuery(
        `UPDATE userData SET userGroups = "[${newlist}]" WHERE uID = ${uid}`,
        []
      );
    }
    }
  );
  res.send(group[0].gID);
};

export { createDm, createGroup };
