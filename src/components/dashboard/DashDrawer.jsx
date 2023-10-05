import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className="nav-drawer-btn dash-drawer-btn">
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <div className="nav-icon" onClick={toggleDrawer(anchor, true)}>
              <FontAwesomeIcon icon="fa-solid fa-bars" className="" />
            </div>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="nav-items-drawer dash-items-drawer block"
    >
      <LeftDashBoard children={<>
      
        <div className="flex justify-end">
        <div className="close-btn">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
      <Divider />
      </>}/>
      {/* <NavItems /> */}
    </Box>
  );
  
  function LeftDashBoard({children}){
    return(
        <div className="left-dash "
    >
         {children}
      nav
        </div>
    )
  }