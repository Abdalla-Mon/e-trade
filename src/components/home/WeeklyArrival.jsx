import { CustomSwiperContainer } from "../fixed-component/CustomSwiper";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { ShopCard } from "../fixed-component/FixedComponent";
import { getHomeData } from "../react-query/FetchData";
function selector(data) {
  return data.filter((e) => e.newArrival);
}
export default function WeeklyArrival() {
  const { data: weeklyArrivalData, isLoading } = getHomeData(selector);
  // if (isLoading) return "loading";
  return (
    <CustomSwiperContainer
      data={weeklyArrivalData}
      text={"This Week's"}
      swiperEle={ShopCard}
      isLoading={isLoading}
      head={"New Arrivals"}
      icon={<HiOutlineShoppingBag />}
      className={"new-arrival"}
    />
  );
}
