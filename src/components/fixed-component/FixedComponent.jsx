import { Rating } from "@mui/material";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSolidChevronRight } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
export function AddToCart({ text }) {
  return (
    <div className="cart-icon flex item-center gap-2">
      {text ? (
        <>
          <FaCartPlus /> Add to cart
        </>
      ) : (
        <LiaCartPlusSolid />
      )}{" "}
    </div>
  );
}
export function AddToWhishList() {
  return (
    <div className="love-icon">
      <AiOutlineHeart />
    </div>
  );
}
export function ShopCard(e) {
  return (
    <div className="shop-card new-arrival-card flex flex-col justify-center text-center relative">
      <div className="img-container relative">
        <img src={e.img} alt={e.id} loading="lazy" />
        <div className="show-btns flex gap-1">
          <AddToWhishList />
          <AddToCart text={true} />
          <Link className="inspect-icon" to={"/shop/" + e.id}>
            <FiEye />
          </Link>
        </div>
      </div>
      <Link to={"/" + e.id}>{e.name}</Link>
      <h3 className="card-price flex gap-3 justify-center mb-1">
        <span>${e.price}</span>
        {e.desc ? <span className="old-price">${e.price - e.desc}</span> : null}
      </h3>
      <Rating name="read-only" value={4} readOnly />
    </div>
  );
}
export function ShopListProduct({ e }) {
  return (
    <div className="searched-prod items-center flex gap-8">
      <div className="left">
        <img src={e.img} loading="lazy" alt={e.name} />
      </div>

      <div className="right  flex gap-4  flex-col">
        <div className="">
          <h4>
            <Link to={"/shop/" + e.id}>{e.name}</Link>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            quisquam hic quod quis exercitationem ipsum. Accusamus tenetur neque
            recusandae rem necessitatibus quasi repudiandae quos, in dolorem
            est, perspiciatis sapiente sint.
          </p>
          <Rating name="read-only" value={4} readOnly />
          <h3 className="card-price flex gap-3  mb-1">
            <span>${e.price - (e.desc || 0)}</span>
            {e.desc ? <span className="old-price">${e.price}</span> : null}
          </h3>{" "}
        </div>
        <div className="icons flex gap-4 ">
          <AddToCart />
          <AddToWhishList />
        </div>
      </div>
    </div>
  );
}
export function SingleProduct({ e }) {
  return (
    <div className="searched-prod items-center flex justify-between gap-8">
      <div className="left">
        <img
          src={e.img}
          loading="lazy"
          alt={e.name}
          style={{ width: "200px" }}
        />
      </div>
      <div className="right tab:items-center flex gap-4 tab:justify-between tab:flex-row flex-col">
        <div className="">
          <Rating name="read-only" value={4} readOnly />
          <h4>
            <Link to={"/shop/" + e.id}>{e.name}</Link>
          </h4>
          <h3 className="card-price flex gap-3  mb-1">
            <span>${e.price - (e.desc || 0)}</span>
            {e.desc ? <span className="old-price">${e.price}</span> : null}
          </h3>{" "}
        </div>
        <div className="icons flex gap-4 tab:flex-col ">
          <AddToCart />
          <AddToWhishList />
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
