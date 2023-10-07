import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebaseConfig/firebaseConfig";
import { authFnc } from "../auth/AuthProvider";
import DashDrawer, { LeftDashBoard } from "./DashDrawer";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { logout } from "../auth/user/Profile";

export default function DashNav() {
  if (!authFnc().logined) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (auth.currentUser.email !== "admin@etrade.com") {
    <Navigate to={"/"} replace={true} />;
  }
  return (
    <div className="dash-nav flex">
      <LeftDashBoard className={"hidden lap:block"} />
      <div className="right-dash">
        <div className="dash-upper-nav flex justify-between items-center">
          <DashDrawer />
          <h3 className="ml-5 lap:ml-0">Admin Dashboard</h3>
          <BasicMenu />
        </div>
        <div className="dash-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="ml-auto dash-avatar">
      <Button
        id="basic-button"
        className="dash-logout"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {" "}
        <Avatar
          alt="Abdalla"
          src="./face-port-1.png"
          className="avatar-img"
          sx={{ width: 48, height: 48 }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
