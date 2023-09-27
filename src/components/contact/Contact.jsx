import { PageLayout } from "../fixed-component/FixedComponent";

export default function Contact() {
  
  return (
    <>
      <PageLayout head={"Contact"} links={["home"]} />
      <div className="contact">
        <div className="container mx-auto">
          <div className="flex flex-col gap-10 lap:flex-row">
            <div className="left w-full lap:w-3/4">
              <Form />
            </div>
            <div className="right w-full lap:w-1/4">
              <ContactText />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function Form() {
  return (
    <>
      <h1>We would love to hear from you.</h1>
      <p>
        If you’ve got great products your making or looking to work with us then
        drop us a line.
      </p>
      <div className="grid  gap-8 lap:grid-cols-3">
        <label className="relative">
          <span>Name *</span> <input type="text" id="name-input" />
        </label>
        <label className="relative">
          <span>Phone *</span> <input type="number" id="phone-input" />
        </label>
        <label className="relative">
          <span>Email *</span> <input type="email" id="email-input" />
        </label>
      </div>
      <label className="relative message-label">
        <span>Message *</span>{" "}
        <input type="text" id="message-input" className="my-8" />
      </label>
      <button>Send Message</button>
    </>
  );
}
function ContactText() {
  return (
    <>
      <h2>Our Store</h2>
      <p className="mb-8 mt-7">
        8212 E. Glen Creek Street Orchard Park, NY 14127, United States of
        America
      </p>
      <p>Phone: +123 456 7890</p>
      <p className="mb-12">Email: Hello@etrade.com</p>
      <h2>Careers</h2>
      <p className="mt-8 mb-12">
        Instead of buying six things, one that you really like.
      </p>
      <h2>Opening Hours:</h2>
      <p className="mt-7">Monday to Saturday: 9am - 10pm</p>
      <p>Sundays: 10am - 6pm</p>
    </>
  );
}
