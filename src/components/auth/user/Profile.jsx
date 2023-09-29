import { Navigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase_config";
import { authFnc } from "../AuthProvider";
import { signOut } from "firebase/auth";
import { useState } from "react";
import {
  BiSolidDashboard,
  BiSolidShoppingBag,
  BiSolidUserDetail,
} from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

export default function Profile() {
  const [state, setState] = useState("dashboard");

  if (!authFnc().logined) {
    return <Navigate to={"/login"} replace={true} />;
  }
  const profileObject = {
    dashboard: {
      title: "Dashboard",
    },
    orders: {
      title: "Orders",
    },
    acc_details: {
      title: "Account Details",
      userName: auth?.currentUser.displayName,
      email: auth?.currentUser.email,
    },
  };
  return (
    <div className="profile">
      <div className="container mx-auto">
        <div className="flex gap-10 flex-col-reverse tab:flex-row  tab:items-center">
          <div className="profile-nav tab:w-2/6">
            <ProfileNav setState={setState} />
          </div>
          <div className="profile-data tab:w-4/6">
            <ProfileData state={state} data={profileObject} />
          </div>
        </div>
      </div>
    </div>
  );
}
function handleClick(el) {
  document.querySelectorAll(".profile-li").forEach((e) => {
    e.classList.remove("active");
  });
  el.classList.add("active");
}
function ProfileNav({ setState }) {
  async function logout() {
    await signOut(auth);
  }
  return (
    <>
      <ul className="flex  flex-row tab:flex-col gap-3 tab:gap-5">
        <li
          className="profile-li active flex gap-2 items-center"
          onClick={(e) => {
            setState("dashboard");
            handleClick(e.target);
          }}
        >
          <BiSolidDashboard /> <span>Dashboard</span>
        </li>
        <li
          className="profile-li flex gap-3 items-center"
          onClick={(e) => {
            setState("orders");
            handleClick(e.target);
          }}
        >
          <BiSolidShoppingBag />
          <span>Orders</span>
        </li>
        <li
          className="profile-li flex gap-3 items-center"
          onClick={(e) => {
            setState("acc_details");
            handleClick(e.target);
          }}
        >
          <BiSolidUserDetail />
          <span> Account</span>
        </li>
        <li
          className="profile-li flex gap-3 items-center"
          onClick={() => {
            logout();
          }}
        >
          <FiLogOut /> <span>Log out</span>
        </li>
      </ul>
    </>
  );
}
function ProfileData({ state, data }) {
  const currentObject = data[state];
  return (
    <>
      <h1>{currentObject.title}</h1>
      {currentObject.userName && (
        <div className="email">
          UserName : <span>{currentObject.userName}</span>
        </div>
      )}
      {currentObject.email && (
        <div className="email">
          Email : <span>{currentObject.email}</span>
        </div>
      )}
    </>
  );
}
