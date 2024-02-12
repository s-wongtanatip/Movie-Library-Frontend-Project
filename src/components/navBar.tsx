import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMagnifyingGlass, FaHeart } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import IMAGES from "../assets/Images";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <section className="grid grid-cols-3 py-0 mt-14 sm:py-14 sm:mt-0 px-10">
        <div className="flex-grow flex justify-start items-center text-2xl">
          <button
            className={location.pathname === "/" ? "hidden" : ""}
            onClick={() => {
              navigate(-1);
            }}
          >
            <div className="flex items-center p-3 gap-3 rounded-full bg-transparent transition-all duration-400 hover:bg-gray-700 ">
              <IoMdArrowRoundBack />
            </div>
          </button>
        </div>
        <div className="flex justify-center">
          <div className="max-w-48 flex items-center">
            <Link to="/">
              <img
                className="max"
                src={IMAGES.logo}
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <div className="flex-grow flex justify-end items-center text-2xl sm:gap-5">
          <Link to="/search?page=1">
            <div className="flex items-center p-3 gap-3 rounded-full bg-transparent transition-all duration-400 hover:bg-gray-700 ">
              <FaMagnifyingGlass />
            </div>
          </Link>
          <Link to="/favorite">
            <div className="flex items-center p-3 gap-3 rounded-full bg-transparent transition-all duration-400 hover:bg-gray-700 ">
              <FaHeart />
            </div>
          </Link>
        </div>
      </section>
    </header>
  );
};

export default NavBar;
