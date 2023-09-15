import { MdEmail } from "react-icons/md";
export default function Newsletter() {
  return (
    <div className="newsletter-conatiner">
      <div className="container mx-auto">
        <div className="newsletter">
          <div className="header">
            <h3 className="flex gap-2 items-center">
              <div className="icon">
                <MdEmail />
              </div>
              Newsletter
            </h3>
          </div>
          <h1 className="mb-8">Get weekly update</h1>
          <div className="flex sellter-email gap-5 flex-col tab:flex-row">
            <label className="flex gap-5">
              <MdEmail />
              <input
                type="text"
                className="outline-none border-none"
                placeholder="example@gmail.com"
              />
            </label>
            <button
              onClick={() => {
                document.querySelector(".sellter-email input").value = "";
              }}
            >
              Subscribe{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
