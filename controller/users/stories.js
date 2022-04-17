import { executeQuery } from "../../config/db";

const uploadStory = async (req, res, uid, imgSrc, time) => {
  let story = await executeQuery(
    `select imgSrc from Story where uID = ${uid}`,
    []
  );
  if (story[0]) {
    let insertQuery = await executeQuery(
      `UPDATE Story SET imgSrc = '${imgSrc}', time = '${time}' WHERE uID = ${uid}`,
      []
    );
    res.send(insertQuery);
  } else {
    let insertQuery = await executeQuery(
      `INSERT into Story(uID, imgSrc, time) Values('${uid}', '${imgSrc}', '${time}')`,
      []
    );
    res.send(insertQuery);
  }
};

const allStories = async (req, res) => {
  let stories = await executeQuery(`select * from Story `, []);
  res.send(stories);
};

export { uploadStory, allStories };
