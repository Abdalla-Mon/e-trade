import BestSeller from "./BestSeller";
import HomeLanding from "./HomeLanding";
import HomeOffer from "./HomeOffer";
import MonthArrival from "./MonthArrival";
import NewArrival from "./NewArrival";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";
export default function Home() {
  return (
    <>
      <HomeLanding />
      <NewArrival />
      <BestSeller />
      <HomeOffer />
      <Testimonials />
      <MonthArrival />
      <Newsletter />
    </>
  );
}
