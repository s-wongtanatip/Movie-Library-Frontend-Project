import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useFavList } from "../App";
import { IMovieDetail, IMovieList } from "../util/interface";

interface Props {
  movie: IMovieList | IMovieDetail;
}

const AddToListBtn = ({ movie }: Props) => {
  const { favListState, setFavListState } = useFavList();
  const favList = favListState;
  const setFavList = setFavListState;
  const [isLiked, setIsLiked] = useState<boolean>();

  const likeUnlikeFunction = () => {
    if (isLiked) {
      setFavList(favList.filter((x) => x != movie.id));
    } else {
      setFavList([...favList, movie.id]);
    }
    setIsLiked((liked) => !liked);
  };

  useEffect(() => {
    if (favList.includes(movie.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favList]);

  return (
    <>
      <button
        className={`text-sm rounded-lg px-3 py-2 mt-5 ${
          isLiked ? "bg-red-500" : "bg-gray-700"
        }`}
        onClick={likeUnlikeFunction}
      >
        <div className="flex items-center gap-2 transition duration-300 active:scale-75">
          {isLiked ? (
            <>
              Added ! <FaCheckCircle />
            </>
          ) : (
            <>
              My List <FaCirclePlus />
            </>
          )}
        </div>
      </button>
    </>
  );
};

export default AddToListBtn;
