import { BsTelephone } from "react-icons/bs";
import { HiOutlineMailOpen } from "react-icons/hi";

export default function Footer() {
  const accountList = [
    "My account",
    "Login / Register",
    "Cart",
    "Wishlist",
    "Shop",
  ];
  const quickLinkList = [
    "Privacy Policy",
    "Terms Of Use",
    "FAQ",
    "Contact",
    "Contact",
  ];
  return (
    <>
      <footer className="upper-footer">
        <div className="container mx-auto">
          <div className="grid tab:grid-cols-2 gap-8 lap:grid-cols-4 ">
            <Support />
            <List list={accountList} head={"Account"} />
            <List list={quickLinkList} head={"Quick Links"} />
            <DownloadApp />
          </div>
        </div>
      </footer>
      <div className="lower-footer text-center">
        Made With Love By{" "}
        <a href="https://abdalla-webportfolio.vercel.app/">Abdalla</a>
      </div>
    </>
  );
}

function Support() {
  return (
    <div className="footer-support footer-ele">
      <h5>Support</h5>
      <p>685 Market Street,</p>
      <p>Las Vegas, LA 95820,</p>
      <p>United States.</p>
      <div className="bottom mt-6 flex flex-col gap-2">
        <a
          href="mailto:abdalla.webdev@gmail.com"
          className="flex items-center gap-2"
        >
          <HiOutlineMailOpen /> abdalla.webdev@gmail.com
        </a>
        <a href="tel:+201127342564" className="flex items-center gap-2">
          <BsTelephone />
          +2 011 27 34 2564
        </a>
      </div>
    </div>
  );
}
function List({ head, list }) {
  return (
    <div className="footer-list footer-ele">
      <h5>{head}</h5>
      <ul>
        {list.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}

function DownloadApp() {
  return (
    <div className="footer-ele download-app">
      <h5>Download App</h5>
      <p>Save $3 With App & New User only</p>
      <div className="images flex gap-8">
        <img src="./footer/qr.png" alt="qr photo" />
        <div className="right flex flex-col gap-8">
          <img src="./footer/play-store.png" alt="play store image" />
          <img src="./footer/app-store.png" alt="app store image" />
        </div>
      </div>
    </div>
  );
}
