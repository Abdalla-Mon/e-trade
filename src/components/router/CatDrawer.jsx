import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { filterByCat } from "../../redux/filterSLice";
import { useDispatch } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig";
const categoryList = ["all", "men", "women", "electronic", "furniture"];
const iconsList = [
  "fa-solid fa-mars",
  "fa-solid fa-venus",
  "fa-solid fa-desktop",
  "fa-solid fa-chair",
];
export default function CatDrawer() {
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

  const list = (anchor) => (
    <Box sx={{ width: 250 }} role="presentation" className="cat-drawer">
      <div className="flex justify-end">
        <div className="close-btn" onClick={toggleDrawer(anchor, false)}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>{" "}
      <Divider />
      <Categories toggleDrawer={toggleDrawer} anchor={anchor} />
    </Box>
  );

  return (
    <div className="cat-drawer-btn">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div
            className="categories-btn gap-4 flex items-center "
            onClick={toggleDrawer(anchor, true)}
          >
            <FontAwesomeIcon icon="fa-solid fa-bars" />
            Categories
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

function Categories({ toggleDrawer, anchor }) {
  const [subCatState, SetSubCatState] = React.useState(false);
  const allProduct = { catType: "mainCat", catName: "all" };
  const [categories, setCategories] = React.useState([
    { catType: "cat", catName: "men" },
    {
      catType: "cat",
      catName: "women",
      subCategories: [
        { catType: "subCat", catName: "makeup", name: "makeup" },
        { catType: "subCat", catName: "jewellery", name: "jewellery" },
      ],
    },
    { catType: "cat", catName: "electronic" },
    { catType: "cat", catName: "furniture" },
  ]);

  React.useEffect(() => {
    async function getCategories() {
      const catRef = doc(db, "Data", "categories");
      const catDocument = await getDoc(catRef);
      setCategories(catDocument.data().categories);
    }
    getCategories();
  }, []);
  const dispatch = useDispatch();
  function handleClick(catName, catType) {
    dispatch(filterByCat([catType, catName]));
    document.querySelector(".cat-drawer .close-btn").click();
    // navigate("/shop");
  }
  return (
    <ul className="cat-ul pt-4 ">
      <NavLink
        to="/shop"
        className={"cat-li"}
        onClick={() => {
          handleClick(allProduct.catName, allProduct.catType);
        }}
      >
        <FontAwesomeIcon icon={"fa-solid fa-shop"} />
        {allProduct.catName}
      </NavLink>
      <Divider />
      {categories.map((e, index) => {
        return (
          <>
            {e.subCategories ? (
              <>
                <li
                  className="cat-li women-li"
                  onClick={() => {
                    SetSubCatState((e) => !e);
                    toggleDrawer(anchor, true);
                  }}
                  key={e.catName}
                >
                  <FontAwesomeIcon icon={iconsList[index]} />
                  {e.catName}
                </li>

                <motion.ul
                  className="women-ul"
                  initial={{ height: 0 }}
                  animate={
                    subCatState ? { height: "fit-content" } : { height: 0 }
                  }
                >
                  <NavLink
                    to="/shop"
                    key={e.catName}
                    className="sub-cat"
                    onClick={() => {
                      handleClick(e.catName, e.catType);
                      SetSubCatState((e) => !e);
                    }}
                  >
                    All
                  </NavLink>{" "}
                  <Divider />
                  {e.subCategories.map((el) => {
                    return (
                      <>
                        <NavLink
                          to="/shop"
                          key={el.catName}
                          className="sub-cat"
                          onClick={() => {
                            handleClick(el.catName, el.catType);
                            SetSubCatState((e) => !e);
                          }}
                        >
                          {el.catName}
                        </NavLink>{" "}
                        {el.catName === "jewellery" ? null : <Divider />}
                      </>
                    );
                  })}
                </motion.ul>
                <Divider />
              </>
            ) : (
              <>
                <NavLink
                  to="/shop"
                  className={"cat-li"}
                  key={e.catName}
                  onClick={() => {
                    handleClick(e.catName, e.catType);
                  }}
                >
                  <FontAwesomeIcon icon={iconsList[index]} />
                  {e.catName}
                </NavLink>
                <Divider />
              </>
            )}
          </>
        );
      })}
    </ul>
  );
}
function CatUl({ toggleDrawer, anchor }) {
  const [womenUl, setWomenUl] = React.useState(false);

  return (
    <ul className="cat-ul pt-4 ">
      {categoryList.map((el, index) => {
        return (
          <>
            {el === "women" ? (
              <>
                <li
                  className="cat-li women-li"
                  onClick={() => {
                    setWomenUl(!womenUl);
                    toggleDrawer(anchor, true);
                  }}
                >
                  <FontAwesomeIcon icon={iconsList[index]} />
                  {el}
                </li>
                <motion.ul
                  className="women-ul"
                  initial={{ height: 0 }}
                  animate={womenUl ? { height: 120 } : { height: 0 }}
                >
                  <NavLink
                    className={"pt-0"}
                    to="shop"
                    onClick={toggleDrawer(anchor, false)}
                  >
                    All
                  </NavLink>
                  <Divider />
                  <NavLink to="shop" onClick={toggleDrawer(anchor, false)}>
                    Fashion
                  </NavLink>
                  <Divider />
                  <NavLink
                    to="shop"
                    className={"pb-0"}
                    onClick={toggleDrawer(anchor, false)}
                  >
                    Accessories
                  </NavLink>
                </motion.ul>
              </>
            ) : (
              <NavLink
                to="shop"
                className={"cat-li"}
                key={el}
                onClick={toggleDrawer(anchor, false)}
              >
                <FontAwesomeIcon icon={iconsList[index]} />

                {el}
              </NavLink>
            )}
            <Divider />
          </>
        );
      })}
    </ul>
  );
}
