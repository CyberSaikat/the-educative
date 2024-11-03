import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function Social() {
  return (
    <div className="hidden md:flex fixed top-[50%] translate-y-[-50%] z-50">
      <div className="grid">
        <Link
          href={"https://www.facebook.com/its.me.devil.724528/"}
          target="_blank"
          className="col-span-1 w-12 h-12 flex justify-center items-center text-xl "
          style={{ background: "#3b5998" }}
        >
          <FaFacebook />
        </Link>
        <Link
          className="col-span-1 w-12 h-12 bg-black flex justify-center items-center text-xl"
          href={""}
        >
          <FaX />
        </Link>
        <Link
          className="col-span-1 w-12 h-12 flex justify-center items-center text-xl"
          style={{ background: "#ff0000" }}
          href={""}
        >
          <FaYoutube />
        </Link>
        <Link
          className="col-span-1 w-12 h-12 flex justify-center items-center text-xl"
          style={{
            background:
              "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
          }}
          href={""}
        >
          <FaInstagram />
        </Link>
        <Link
          className="col-span-1 w-12 h-12 flex justify-center items-center text-xl"
          style={{ background: "#0a66c2" }}
          href={""}
        >
          <FaLinkedin />
        </Link>
      </div>
    </div>
  );
}
