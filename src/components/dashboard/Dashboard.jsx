import { Navigate } from "react-router-dom";
import { auth } from "../../firebaseConfig/firebaseConfig";

export default function Dashboard(){
if(auth.currentUser.email!=="admin@etrade.com"){
    <Navigate to={"/"} replace={true} />
}
}