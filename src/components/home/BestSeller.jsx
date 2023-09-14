import { Link } from "react-router-dom";
import data from "../../srcDb/home.json";
import { AddToCart } from "../fixed-component/FixedComponent";

import { CustomSwiperContainer } from "../fixed-component/CustomSwiper";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Rating } from "@mui/material";
export default function BestSeller() {
  const bestSellerData = data.filter((e) => e.bestSeller);
  return (
    <CustomSwiperContainer
      data={bestSellerData}
      text={"This Month's"}
      swiperEle={BestSellerCard}
      head={"Best Seller"}
      icon={<HiOutlineShoppingBag />}
      className={"best-seller"}
    />
  );
}
function BestSellerCard(e) {
  return (
    <div className="best-seller-card ">
      <Link to={e.id} className="title-link">
        {e.name}
      </Link>
      <h5>${e.price}</h5>
      <Rating name="read-only" value={4} readOnly />

      <Link to={e.id}>
        <img src={e.img} alt={e.name} />
      </Link>
      <AddToCart />
    </div>
  );
}
