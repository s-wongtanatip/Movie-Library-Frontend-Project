import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaHeart } from "react-icons/fa6";

const NavBar = () => {
  return (
    <section className="flex justify-between my-14 mx-10">
      <div className="w-[50px] flex justify-center items-center text-2xl">
        <Link to="/search">
          <FaMagnifyingGlass />
        </Link>
      </div>
      <div className="max-w-[200px]">
        <Link to="/">
          <img
            className="max"
            src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
            alt="logo"
          />
        </Link>
      </div>
      <div className="w-[50px] flex justify-center items-center text-2xl">
        <Link to="/favorite">
          <FaHeart />
        </Link>
      </div>
    </section>
  );
};

export default NavBar;
