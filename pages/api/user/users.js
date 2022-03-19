import nc from "next-connect";
import {getAllUsers} from "../../../controller/users/users"


const Handler = nc();
Handler.get(getAllUsers);

export default Handler;

