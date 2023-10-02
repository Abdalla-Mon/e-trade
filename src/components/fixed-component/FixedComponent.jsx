import { Rating } from "@mui/material";
import React from "react";
import { BiSolidChevronRight } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

import { AddToCart, AddToWhishList } from "./CardBtns";

export function CardPrice({ e, additionalClass }) {
  return (
    <h3 className={"card-price flex gap-3  mb-1 " + additionalClass}>
      <span>${e.price - (e.desc || 0)}</span>
      {e.desc ? <span className="old-price">${e.price}</span> : null}
    </h3>
  );
}
export function ShopCard(e) {
  return (
    <div className="shop-card new-arrival-card flex flex-col justify-center text-center relative">
      <div className="img-container relative">
        <img src={e.img} alt={e.id} loading="lazy" />
        <div className="show-btns flex gap-1">
          <AddToWhishList item={e} />
          <AddToCart text={true} item={e} />
          <Link
            className="inspect-icon"
            to={"/shop/" + e.id}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
          >
            <FiEye />
          </Link>
        </div>
      </div>
      <Link
        to={"/shop/" + e.id}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        {e.name}
      </Link>

      <CardPrice e={e} additionalClass={" justify-center"} />
      <Rating name="read-only" value={4} readOnly />
    </div>
  );
}

export function ShopListProduct({ e }) {
  return (
    <div className="searched-prod items-center flex gap-8">
      <div className="left">
        <Link
          to={"/shop/" + e.id}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          <img src={e.img} loading="lazy" alt={e.name} />
        </Link>
      </div>

      <div className="right  flex gap-4  flex-col">
        <div className="">
          <h4>
            <Link
              to={"/shop/" + e.id}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
            >
              {e.name}
            </Link>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            quisquam hic quod quis exercitationem ipsum. Accusamus tenetur neque
            recusandae rem necessitatibus quasi repudiandae quos, in dolorem
            est, perspiciatis sapiente sint.
          </p>
          <Rating name="read-only" value={4} readOnly />
          <CardPrice e={e} />
        </div>
        <div className="icons flex gap-4 ">
          <AddToCart item={e} />
          <AddToWhishList item={e} />
        </div>
      </div>
    </div>
  );
}
export function SingleProduct({ e }) {
  return (
    <div className="searched-prod items-center flex justify-between gap-8">
      <div className="left">
        <img src={e.img} loading="lazy" alt={e.name} width={"200px"} />
      </div>
      <div className="right tab:items-center flex gap-4 tab:justify-between tab:flex-row flex-col">
        <div className="">
          <Rating name="read-only" value={4} readOnly />
          <h4>
            <Link
              to={"/shop/" + e.id}
              onClick={() => {
                document
                  .querySelector(".searchbar-container .close-btn ")
                  .click();
              }}
            >
              {e.name}
            </Link>
          </h4>
          <CardPrice e={e} />
        </div>
        <div className="icons flex gap-4 tab:flex-col ">
          <AddToCart item={e} />
          <AddToWhishList item={e} />
        </div>
      </div>
    </div>
  );
}
export function PageLayout({ head, links }) {
  return (
    <div className="layout">
      <div className="flex flex-col justify-center items-center">
        <h1>{head}</h1>
        <div className="flex gap-2 items-center flex-wrap">
          {links.map((el) => {
            return (
              <React.Fragment key={el}>
                <Link to={el === "home" ? "/" : "/" + el}>{el}</Link>
                <BiSolidChevronRight />
              </React.Fragment>
            );
          })}
          <a>{head}</a>
        </div>
      </div>
    </div>
  );
}
export function CustomHeader({ icon, text, head }) {
  return (
    <div className="custom-header">
      <div className="flex gap-2 items-center">
        <div className="icon">{icon}</div>
        {text}
      </div>
      <h1> {head}</h1>
    </div>
  );
}
