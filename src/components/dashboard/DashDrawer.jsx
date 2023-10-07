import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import { MdOutlineAddBusiness } from "react-icons/md";
import { BiCategory, BiPurchaseTag } from "react-icons/bi";

export default function DashDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="nav-drawer-btn dash-drawer-btn lap:hidden">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="nav-icon" onClick={toggleDrawer(anchor, true)}>
            <FontAwesomeIcon icon="fa-solid fa-bars" />
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className="lab:hidden"
          >
            {list(anchor, toggleDrawer)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
const list = (anchor, toggleDrawer) => (
  <Box
    sx={{ width: 300 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
    className="nav-items-drawer dash-items-drawer block lab:hidden"
  >
    <LeftDashBoard children={<CloseBtn />} />
  </Box>
);
function CloseBtn() {
  return (
    <>
      <div className="flex justify-between">
        <Logo className={"logo "} />

        <div className="close-btn">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
      <Divider />
    </>
  );
}
function Logo({ className }) {
  return (
    <Link to="/" className={className}>
      <div className="">
        <img src="./logo.png" />
      </div>
    </Link>
  );
}
export function LeftDashBoard({ children, className }) {
  const listItems = [
    {
      id: "product-list",
      icon: <BsShop />,
      text: "Products List",
      link: "/dashboard",
    },
    {
      id: "add-product",
      icon: <MdOutlineAddBusiness />,
      text: "Add Product",
      link: "/dashboard/add_product",
    },
    {
      id: "cat-list",
      icon: <BiCategory />,
      text: "Category List",
      link: "/dashboard/categories",
    },
    {
      id: "Orders",
      icon: <BiPurchaseTag />,
      text: "Orders",
      link: "/dashboard/orders",
    },
  ];
  const loaction = useLocation();
  return (
    <div className={"left-dash " + className}>
      {children}
      <Logo className={"logo hidden lap:block"} />
      <Divider />
      <ul className="drawer-items">
        {listItems.map((e) => (
          <ListItem
            icon={e.icon}
            text={e.text}
            link={e.link}
            key={e.id}
            active={"#" + e.link === location.hash}
          />
        ))}
      </ul>
    </div>
  );
}
function ListItem({ icon, text, link, active }) {
  return (
    <li className="list-item">
      <Link
        className={"flex items-center gap-3" + (active ? " active" : "")}
        to={link}
      >
        {icon}
        {text}
      </Link>
    </li>
  );
}
