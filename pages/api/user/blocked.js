import nc from "next-connect";
import { getBlocked } from "../../../controller/users/userData";


function Handler(req, res){
    const Handler = nc();
    const { uid } = req.query;
    Handler.get(getBlocked(req, res, uid));
    return Handler;
}

export default Handler;