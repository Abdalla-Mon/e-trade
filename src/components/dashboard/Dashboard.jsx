import { Navigate } from "react-router-dom";
import { auth } from "../../firebaseConfig/firebaseConfig";
import { authFnc } from "../auth/AuthProvider";
import DashDrawer from "./DashDrawer";

export default function Dashboard(){
    if (!authFnc().logined) {
        return <Navigate to={"/login"} replace={true} />;
      }
    if(auth.currentUser.email!=="admin@etrade.com"){
    <Navigate to={"/"} replace={true} />
    }
    return(
        <DashDrawer />
    )
}