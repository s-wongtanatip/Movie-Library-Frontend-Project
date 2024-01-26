import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useFavList } from "../App";
import { Link } from "react-router-dom";

const baseUrl = "http://image.tmdb.org/t/p/";
const posterSize = "w780"; // [ "w92", "w154", "w185", "w342", "w500", "w780", "original" ]

type Props = {
  title: string;
  poster_path: string;
  cardWidth: number;
  id: number;
};

const MovieCard = ({ title, poster_path, cardWidth, id }: Props) => {
  const { favListState, setFavListState } = useFavList();
  const favList = favListState;
  const setFavList = setFavListState;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>();

  useEffect(() => {
    if (favList.includes(id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favList]);

  const likeUnlikeFunction = () => {
    if (isLiked) {
      setFavList(favList.filter((x) => x != id));
    } else {
      setFavList([...favList, id]);
    }
    setIsLiked((liked) => !liked);
  };

  return (
    <div
      id="movieCard"
      className={`relative hover:bg-[#ffffff] ${
        isLiked ? "text-red-400" : "text-gray-400"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      style={{ maxWidth: `${cardWidth}px`}}
      // onClick={()=>{console.log(id)}}
    >
      <Link to={`/detail/${id}`} state={{ movieId: id }}>
        {poster_path ? (
          <img
            className={isHovered ? "bg-white opacity-70" : ""}
            src={`${baseUrl}${posterSize}${poster_path}`}
            alt={title}
            style={{ maxWidth: `${cardWidth}px`, aspectRatio: "2/3" }}
          />
        ) : (
          <div
            className="bg-gray-800 aspect-[2/3] flex justify-center items-center text-center"
            style={{ width: `${cardWidth}px` }}
          >
            {title}
          </div>
        )}
      </Link>
      {isHovered && (
          <button
            className="text-xl bg-gray-100 rounded-full aspect-square absolute top-2 right-2 w-[2.5rem] flex justify-center items-center"
            onClick={likeUnlikeFunction}
          >
            <FaHeart
              id="heartIcon"
              className="transition duration-300 active:scale-75"
            />
          </button>
      )}
    </div>
  );
};

export default MovieCard;
