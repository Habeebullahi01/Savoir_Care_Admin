import Link from "next/link";
import style from "../../styles/Footer.module.scss";

const Footer = () => {
  return (
    <div className={`bg-pink-700 p-4`}>
      <div
        id="footer"
        className={`flex flex-col md:flex-row items-start md:items-start justify-evenly mt-8 mb-4`}
      >
        <div id="quick_links" className={`hidden md:block`}>
          <h1>Quick Links</h1>
          <ul className={`text-xl font-semibold indent-2 `}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div
          id="newsletter_subscription"
          className={`m-auto md:m-0 w-5/6 md:w-[40%]`}
        >
          <p className={`text-xl italic font-medium`}>
            Subscribe to our newsletter to get notified about new stock and
            discounts.
          </p>
          <form className="my-4" method="POST" action="#">
            <input
              id="nl_mail"
              className={`${style.efield} sm:block md:inline-block`}
              type={"email"}
              placeholder="your-email@example.com"
            />
            <button
              className={`bg-gray-700 rounded text-pink-400 p-2 m-4 hover:bg-white hover:text-black`}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <p className={`text-center text-sm font-mono`}>Copyright ©2022 Haleema</p>
    </div>
  );
};

export default Footer;
