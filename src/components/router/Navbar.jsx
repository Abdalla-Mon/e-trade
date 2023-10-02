import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import CatDrawer from "./CatDrawer";
import { Link, NavLink } from "react-router-dom";
import NavItemsDrawer from "./NavItemsDrawer";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUser, BiCart } from "react-icons/bi";
import { useSelector } from "react-redux";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { auth } from "../../firebaseConfig/firebaseConfig";
export default function Navbar() {
  const [SearchBarPopup, setSearchBarPopup] = useState(false);
  return (
    <>
      <nav className="upper-nav">
        <div className="container mx-auto">
          <div className="flex justify-between p-5 pb-3">
            <div className="img-container flex items-center">
              <Link to="/">
                {" "}
                <img src="./logo.png" alt="logo" />
              </Link>
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

      <LowerNav />

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

function Icons() {
  const cartSlice = useSelector((e) => e.cart);

  return (
    <div className="nav-icons flex">
      <div
        className="nav-icon love-icon relative"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        <Link to="/wishlist">
          <AiOutlineHeart key={"love-icon"} />
          <span className="wish-count absolute">
            {cartSlice.numOfWishlistItems}
          </span>
        </Link>
      </div>
      <div
        className="nav-icon cart-icon relative"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        <Link to="/cart">
          {" "}
          <BiCart key={"cart-icon"} />
          <span className="cart-count absolute">
            {cartSlice.numOfCartItems}
          </span>
        </Link>
      </div>
      <ProfileLink />

      <NavItemsDrawer />
    </div>
  );
}
function ProfileLink() {
  return (
    <div className="nav-icon " onClick={() => {}}>
      <Link to={auth.currentUser ? "/profile" : "/login"}>
        <BiUser key={"user-icon"} />
      </Link>
    </div>
  );
}
function LowerNav() {
  const { scrollY } = useScroll();
  const [animation, setAnimation] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 600) {
      setAnimation(true);
    } else {
      setAnimation(false);
    }
  });
  return (
    <motion.nav
      className="lower-nav px-5 "
      style={{ width: "100%" }}
      animate={
        animation
          ? { position: "fixed", top: [-100, 0] }
          : { position: "relative", top: [0, -200, -200, 0] }
      }
      transition={
        !animation ? { position: { delay: 0.3 }, top: { duration: 0.6 } } : ""
      }
    >
      <div className="container mx-auto">
        <motion.div className="flex justify-between items-center">
          <CatDrawer />
          <div className="hidden tab:block">
            <NavItems />
          </div>
          <Icons />
        </motion.div>{" "}
      </div>{" "}
    </motion.nav>
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
          <NavLink
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            key={el}
            to={el === "home" ? "" : el}
            className="nav-item"
          >
            {el}
          </NavLink>
        );
      })}
    </ul>
  );
}
