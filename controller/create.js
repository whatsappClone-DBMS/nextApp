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
    `insert into userGroup(gName, gMembers, chatHistory) Values('${name}', '[${members}]', '[]')`,
    []
  );

  let group = await executeQuery(
    `select gID from userGroup where gMembers = '[${members}]'`,
    []
  );
  console.log("atif", group);
  if (group) {
    console.log("atif2s", group);
    let memberArray = [members];
    memberArray.map(async (uid) => {
      let GroupArray = await executeQuery(
        `select userGroups from userData where uID = ${uid}`,
        []
      );
      if (GroupArray) {
        let oldArr = JSON.parse(GroupArray[0].userGroups);
        console.log("hi", GroupArray[0].userGroups);
        var newlist;
        if (oldArr.length > 0) {
          newlist = [...oldArr, group[group.length - 1]?.gID];
        } else {
          newlist = [group[0]?.gID];
        }
        let update = await executeQuery(
          `UPDATE userData SET userGroups = "[${newlist}]" WHERE uID = ${uid}`,
          []
        );
      } else {
        newlist = [group[0]?.gID];
        let update = await executeQuery(
          `UPDATE userData SET userGroups = "[${newlist}]" WHERE uID = ${uid}`,
          []
        );
      }
    });
  }
};

export { createDm, createGroup };
