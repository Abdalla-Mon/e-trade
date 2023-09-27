import { HiOutlineShoppingBag } from "react-icons/hi";
import { CustomSwiperContainer } from "../fixed-component/CustomSwiper";
import { CustomHeader, PageLayout } from "../fixed-component/FixedComponent";
import { RiTeamFill } from "react-icons/ri";

export default function About() {
  return (
    <>
      <PageLayout links={["home"]} head={"About "} />
      <div className="about">
        <AboutLanding />
        <OurJourney />
        <OurTeam />
        <Features />
      </div>
    </>
  );
}

function AboutLanding() {
  return (
    <div className="about-landing  ">
      <div className="container mx-auto">
        <div className="flex flex-col lap:flex-row gap-10 lap:items-center">
          <div className="img-container lap:w-3/6">
            <img src="./about/about-landing.webp" alt="about-landing" />
          </div>
          <div className="right lap:w-3/6">
            <CustomHeader
              icon={<HiOutlineShoppingBag />}
              text={"About Store"}
            />
            <h1>Online shopping includes both buying things online.</h1>
            <h2>
              Salesforce B2C Commerce can help you create unified, intelligent
              digital commerce experiences — both online and in the store.
            </h2>
            <p>
              Empower your sales teams with industry tailored solutions that
              support manufacturers as they go digital, and adapt to changing
              markets & customers faster by creating new business.
            </p>
            <p>
              Salesforce B2B Commerce offers buyers the seamless, self-service
              experience of online shopping with all the B2B
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OurJourney() {
  const ourjourneyData = [
    {
      id: "j-1",
      img: "./about/shape-01.webp",
      head: "40,000+ Happy Customer",
      text: "Empower your sales teams with industry tailored solutions that support.",
    },
    {
      id: "j-2",
      img: "./about/shape-02.webp",
      head: "16 Years of Experiences",
      text: "Empower your sales teams with industry tailored solutions that support.",
    },
    {
      id: "j-3",
      img: "./about/shape-03.webp",
      head: "12 Awards & Trophies Won",
      text: "Empower your sales teams with industry tailored solutions that support.",
    },
  ];
  return (
    <div className="ourjourney">
      <div className="container mx-auto">
        <div className=" grid gap-8 tab:grid-cols-2 lap:grid-cols-3">
          {ourjourneyData.map((e) => {
            return <OurJourneyCard e={e} key={e.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
function OurJourneyCard({ e }) {
  return (
    <div className="ourjourney-card">
      <div className="img-container">
        <img src={e.img} alt="about us" />
      </div>
      <h5>{e.head}</h5>
      <p>{e.text}</p>
    </div>
  );
}
function OurTeam() {
  let data = [
    { text: "Desinger", head: "Abdalla Refaat", img: "./about/team-01.webp" },
    { text: "Developer", head: "Mohamed Refaat", img: "./about/team-02.webp" },
    { text: "Desinger", head: "Abdalla Refaat", img: "./about/team-03.webp" },
    { text: "Developer", head: "Mohamed Refaat", img: "./about/team-04.webp" },
    { text: "Desinger", head: "Abdalla Refaat", img: "./about/team-01.webp" },
    { text: "Developer", head: "Mohamed Refaat", img: "./about/team-02.webp" },
    { text: "Desinger", head: "Abdalla Refaat", img: "./about/team-03.webp" },
    { text: "Developer", head: "Mohamed Refaat", img: "./about/team-04.webp" },
  ];
  return (
    <CustomSwiperContainer
      data={data}
      text={"Our Team"}
      swiperEle={SwiperEle}
      head={"Expart Management Team"}
      icon={<RiTeamFill />}
      className={"our-team"}
    />
  );
}
function SwiperEle(e) {
  return (
    <div className="team">
      <div className="img-container">
        <img src={e.img} />
      </div>
      <p>{e.text}</p>
      <h4>{e.head}</h4>
    </div>
  );
}

function Features() {
  return (
    <div className="features">
      <div className="container mx-auto flex flex-col gap-12">
        <Feature
          className={"lap:flex-row feature-1"}
          img={"./about/feature-01.webp"}
          index={1}
        />
        <Feature
          className={"lap:flex-row-reverse feature-2"}
          img={"./about/feature-02.webp"}
          index={2}
        />
      </div>{" "}
    </div>
  );
}

function Feature({ className, img, index }) {
  return (
    <div
      className={"feature gap-10 flex flex-col lap:items-center " + className}
    >
      <div className="img-container ">
        <img src={img} alt={"about-feature"} />
      </div>

      <div className="feature-text ">
        <h6>Features #0{index}</h6>
        <h1>Solutions that work together</h1>
        <p>
          Publish your eCommerce site quickly with our easy-to-use store
          builder— no coding required. Migrate your items from your point of
          sale system or turn your Instagram feed into a shopping site and start
          selling fast. Square Online works for all kinds of businesses—retail,
          restaurants, services.
        </p>
        <button>Get in touch</button>
      </div>
    </div>
  );
}
