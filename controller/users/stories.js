import { executeQuery } from "../../config/db";

const uploadStory = async (req, res, uid, imgSrc) => {
  console.log("bc", imgSrc);
  let story = await executeQuery(`select * from Story where uID = ${uid}`, []);
  if (story) {
    let insertQuery = await executeQuery(
      `UPDATE Story SET imgSrc = "${imgSrc}" WHERE uID = ${uid} `,
      []
    );
  } else {
    let insertQuery = await executeQuery(
      `INSERT into Story(uID, imgSrc) Values("${uid}", "${imgSrc}")`,
      []
    );
  }

  res.send(insertQuery);
};

const allStories = async (req, res) => {
  let stories = await executeQuery(`select * from Story `, []);
  res.send(stories);
};

export { uploadStory, allStories };
