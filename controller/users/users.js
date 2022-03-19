import {executeQuery} from "../../config/db";

const getAllUsers = async (req,res) => {
    let user = await executeQuery('select * from Users',[])
    res.send(user);
}

export {getAllUsers};