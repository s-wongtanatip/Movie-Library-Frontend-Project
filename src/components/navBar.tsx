import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaHeart } from "react-icons/fa6";
import { useState } from "react";

const NavBar = () => {
  // const [isHoveredSearch, setIsHoveredSearch] = useState<boolean>(false);
  // const [isHoveredFav, setIsHoveredFav] = useState<boolean>(false);
  return (
    <header>
      <section className="grid grid-cols-3 my-14 mx-10">
        <div className="flex-grow flex justify-start items-center text-2xl">
          <Link to="/search">
            <div className="flex items-center p-3 gap-3 rounded-full bg-transparent transition-all duration-400 hover:bg-gray-700 ">
              <FaMagnifyingGlass />
            </div>
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="max-w-48">
            <Link to="/">
              <img
                className="max"
                src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <div className="flex-grow flex justify-end items-center text-2xl">
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
