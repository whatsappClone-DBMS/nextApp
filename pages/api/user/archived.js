import nc from "next-connect";
import { getArchived } from "../../../controller/users/userData";


function Handler(req, res){
    const Handler = nc();
    const { uid } = req.query;
    Handler.get(getArchived(req, res, uid));
    return Handler;
}

export default Handler;