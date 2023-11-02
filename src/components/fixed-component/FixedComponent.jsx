import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidChevronRight } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AddToCart, AddToWhishList } from "./CardBtns";
export function Img({ img, width }) {
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (ref?.current?.height > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [ref?.current?.height]);
  const imgAltSrc =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAADGCAMAAAAqo6adAAAAMFBMVEX////p6en8/PzS0tL5+fnx8fHn5+fX19f29vbt7e3a2trd3d3y8vLi4uL6+vru7u6sweb6AAAClElEQVR4nO3a3XarIBCGYSGgICr3f7cd0CZpfulea+vq5H3Ss3rAN4yj0XQdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOBDWJf7NBapz84evZyduXk4XRvncPSSdjSl073BH72snUzjmve2APHohe3CzkNxH3/4iBkQxmF11//m6KXtwQzfTjL2gy2CL8PwI7b/Ev9m3oc5H7SkPcVh6/7ZPfiv+gbwwyj55e/Jtd7qrkCod3vj8GLQqa7AvOZ/NefrPNxtQfsyY5LPq93vtgKorIAdU5LvO/O7w0p8jRUwqeRPb5Mp7QCbav6p4UiVBfCl/dO77i905p/r9j+67bmjsQDL3Lr9OvP7VArQ9oTDLvoK0KdZNGZanLr8El4q0HiwW5ZFV35Xdj+1PuCyrlTgvy5oZ6Hmb7j4V5JfKqCpAWr+5kfcNpQCfHB+F5Tln/4hv6YB8Nv+17b/kr//Vf6gK7/re8nf+oKr5A9BU34r8fu59Q2HU5e/M33ReHCNr+t9cKz52zJZhflDzd92A7y2v6bLn+zpegI0ndNB3+nfdbnmb7kCOK+v/dcrYFsDTELd9ssENKZpAgTvp8lr235pAFML8O47sJPdlwKo2/7aAKUCrx8BW9l9r3H71wYoFXh1YZP43uvcfjmz1wKY5x3g/KrpNcHfk7cCPJsBIedc4mvs/ipuBYiP+nuZYi5862PCP2jLb/p8OwXcFNf4WfMPoez3KdCbeLnFsc7nGLf8XuXsO/PmLEqrB/ms4Wv+mHWO/ishRvNTvMhqR9+F9eZnBeK5Auo3fyVToH/QAcrP/Gs23JwE0vmfk76yYYrSBuWTFX7dBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPDMF+dDFfFdX6/YAAAAAElFTkSuQmCC";
  return (
    <>
      <img
        ref={ref}
        src={loading ? imgAltSrc : img.src}
        alt={img.alt}
        loading="lazy"
        width={width && "200px"}
        onLoad={() => setLoading(false)}
      />
      {/* {loading && (
        <div className="img-loader">
          <CircularProgress color="inherit" />
        </div>
      )} */}
    </>
  );
}
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
        <Img img={{ src: e.img, alt: e.id }} key={e.id} />
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
          <Img img={{ src: e.img, alt: e.name }} key={e.name} />

          {/* <img src={e.img} loading="lazy" alt={e.name} /> */}
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
        <Img img={{ src: e.img, alt: e.name }} key={e.name} width={true} />
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
