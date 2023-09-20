import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { motion, useAnimate, useAnimationControls } from "framer-motion";
export function CustomSwiperContainer({
  className,
  icon,
  head,
  text,
  data,
  swiperEle,
}) {
  return (
    <div className={"custom-container " + className}>
      <div className="container mx-auto">
        <div className="custom-header">
          <div className="flex gap-2 items-center">
            <div className="icon">{icon}</div>
            {text}
          </div>
          <h1> {head}</h1>
        </div>
        <CustomSwiper num={40} data={data} swiperEle={swiperEle} />
      </div>
    </div>
  );
}
export default function CustomSwiper({ data, num, swiperEle }) {
  const [animation, setAnimation] = useState(false);
  const controls = useAnimationControls();
  const [scope, animate] = useAnimate();
  useEffect(() => {
    controls.start({
      // x: ["100px", "-100px", "0px"],
      opacity: [0, 1],
      transition: { duration: 0.6 },
    });
    // return controls.stop();
  }, [animation]);
  return (
    <>
      <Swiper
        spaceBetween={num}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        loop={true}
        navigation={{
          enabled: true,
        }}
        modules={[Navigation]}
        className="custom-swiper"
        onSlideChange={() => {
          setAnimation(!animation);
        }}
      >
        {data.map((el, index) => {
          return (
            <SwiperSlide key={index}>
              <motion.div
                // whileInView={() => setAnimation(!animation)}
                animate={controls}
              >
                {swiperEle(el)}
              </motion.div>
            </SwiperSlide>
          );
        })}

        <div className="navigation">
          <span className="next-btn">
            <BsArrowRight />
          </span>
          <span className="prev-btn">
            <BsArrowLeft />
          </span>
        </div>
      </Swiper>
    </>
  );
}
