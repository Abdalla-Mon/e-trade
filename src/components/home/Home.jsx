import BestSeller from "./BestSeller";
import HomeLanding from "./HomeLanding";
import HomeOffer from "./HomeOffer";
import WeeklyArrival from "./WeeklyArrival";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";
import MonthlyArrival from "./MonthlyArrival";
export default function Home() {
  return (
    <>
      <HomeLanding />
      <WeeklyArrival />
      <BestSeller />
      <HomeOffer />
      <Testimonials />
      <MonthlyArrival />
      <Newsletter />
    </>
  );
}
