import nc from "next-connect";
import {getAllUsers, perUser} from "../../../controller/users/users"


function Handler(req, res){
    const Handler = nc();
    const { uid } = req.query;
    if(uid){
        Handler.get(perUser(req, res, uid));
    }
    else{
        Handler.get(getAllUsers);
    }
    return Handler;
}


export default Handler;

