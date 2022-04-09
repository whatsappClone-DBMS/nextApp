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

export { createDm };
