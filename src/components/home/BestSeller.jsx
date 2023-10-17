import { Link } from "react-router-dom";
// import { AddToCart } from "../fixed-component/cardBtns";
import { AddToCart } from "../fixed-component/CardBtns";
import { CustomSwiperContainer } from "../fixed-component/CustomSwiper";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Rating } from "@mui/material";
import { getHomeData } from "../react-query/FetchData";
function selector(data) {
  return data.filter((e) => e.bestSeller);
}
export default function BestSeller() {
  const { data: bestSellerData, isLoading } = getHomeData(selector);

  return (
    <CustomSwiperContainer
      isLoading={isLoading}
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
      <Link
        to={"/shop/" + e.id}
        className="title-link"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        {e.name}
      </Link>
      <h5>${e.price}</h5>
      <Rating name="read-only" value={4} readOnly />

      <Link
        to={"/shop/" + e.id}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        <img src={e.img} alt={e.name} />
      </Link>
      <AddToCart item={e} />
    </div>
  );
}
