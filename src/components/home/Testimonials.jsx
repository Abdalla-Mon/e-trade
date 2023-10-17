import { CustomSwiperContainer } from "../fixed-component/CustomSwiper";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
export default function Testimonials() {
  const testimonialsData = [
    {
      head: "Head of idea",
      text: "Abdalla Refaat",
      img: "./landing-page/avatar-1.webp",
    },
    {
      head: "Head of idea",
      text: "Abdalla Refaat",
      img: "./landing-page/avatar-2.webp",
    },
    {
      head: "Head of idea",
      text: "Abdalla Refaat",
      img: "./landing-page/avatar-3.webp",
    },
    {
      head: "Head of idea",
      text: "Abdalla Refaat",
      img: "./landing-page/avatar-1.webp",
    },
    {
      head: "Head of idea",
      text: "Abdalla Refaat",
      img: "./landing-page/avatar-2.webp",
    },
    {
      head: "Head of idea",
      text: "Abdalla Refaat",
      img: "./landing-page/avatar-3.webp",
    },
    {
      head: "Head of idea",
      text: "Abdalla Refaat",
      img: "./landing-page/avatar-1.webp",
    },
    {
      head: "Head of idea",
      text: "Abdalla Refaat",
      img: "./landing-page/avatar-2.webp",
    },
    {
      head: "Head of idea",
      text: "Abdalla Refaat",
      img: "./landing-page/avatar-3.webp",
    },
  ];
  return (
    <div className="testi-container">
      <CustomSwiperContainer
        data={testimonialsData}
        text={"Testimonials"}
        swiperEle={TestimonialsCard}
        head={"Users Feedback"}
        icon={<BiSolidQuoteAltLeft />}
        className={"testimonials"}
        isLoading={false}
      />
    </div>
  );
}

function TestimonialsCard(e) {
  return (
    <div className="testi-card">
      <div className="quote">
        <p>
          “ It&apos;s amazing how much easier it has been to meet new people and
          create instantly non connections. I have the exact same personal the
          only thing that has changed is my mind set and a few behaviors. “
        </p>
      </div>
      <div className="avater flex gap-3 items-center">
        <div className="img-container">
          <img src={e.img} alt={e.head} />
        </div>
        <div className="avatar-text">
          <h6>{e.head}</h6>
          <h5>{e.text}</h5>
        </div>
      </div>
    </div>
  );
}
