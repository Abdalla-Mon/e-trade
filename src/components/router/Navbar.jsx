import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import CatDrawer from "./CatDrawer";
import { NavLink } from "react-router-dom";
import NavItemsDrawer from "./NavItemsDrawer";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUser, BiCart } from "react-icons/bi";
export default function Navbar() {
  const [SearchBarPopup, setSearchBarPopup] = useState(false);
  return (
    <>
      <nav className="upper-nav">
        <div className="container mx-auto">
          <div className="flex justify-between p-5 pb-3">
            <div className="img-container flex items-center">
              <img src="./logo.png" alt="logo" />
            </div>
            <div
              className="fake-search-bar w-3/6"
              onClick={() => setSearchBarPopup(true)}
            >
              <FakeSearchBar />
            </div>
          </div>
        </div>
      </nav>
      <nav className="lower-nav px-5 ">
        <div className="container mx-auto">
          <LowerNav />
        </div>{" "}
      </nav>
      {SearchBarPopup ? (
        <SearchBar setSearchBarPopup={setSearchBarPopup} />
      ) : null}
    </>
  );
}
function FakeSearchBar() {
  return (
    <>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />{" "}
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for specific product"
          inputProps={{ "aria-label": "search for specific product" }}
        />
      </Paper>
    </>
  );
}

const icons = [
  <AiOutlineHeart key={"love-icon"} />,
  <BiCart key={"cart-icon"} />,
  <BiUser key={"user-icon"} />,
];
function Icons() {
  return (
    <div className="nav-icons flex">
      {icons.map((e, i) => {
        return (
          <div className="nav-icon" key={i}>
            {e}
          </div>
        );
      })}
      <NavItemsDrawer />
    </div>
  );
}
const navItems = ["home", "shop", "about", "contact"];
export function NavItems({ className }) {
  return (
    <ul
      className={
        "nav-ul gap-4 tab:gap-6 flex  tab:flex-row lap:items-center flex-col"
      }
    >
      {navItems.map((el) => {
        return (
          <NavLink key={el} to={el === "home" ? "" : el} className="nav-item">
            {el}
          </NavLink>
        );
      })}
    </ul>
  );
}
function LowerNav() {
  return (
    <div className="flex justify-between items-center">
      <CatDrawer />
      <div className="hidden tab:block">
        <NavItems />
      </div>
      <Icons />
    </div>
  );
}
