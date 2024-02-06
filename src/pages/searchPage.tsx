import { useEffect, useRef, useState } from "react";
import { cardNum } from "./landingPage";
import DropdownCheckbox from "../components/dropdownCheckbox";
import { genresList } from "../util/movieGenreList";
import { IMovieList } from "../util/interface";
import MovieCard from "../components/movieCard";
import { getMovieBySearch, getPopularMovieList } from "../services/services";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuSearchX } from "react-icons/lu";

const SearchPage = () => {
  const cardWidth =
    window.innerWidth / (Math.floor(window.innerWidth / 200) + 1);
  // const gap = (window.innerWidth - 80 - cardNum * cardWidth) / (cardNum - 1);
  const cardCountArray: number[] = [...Array(20).keys()];
  const listForSortBy = ["Title", "Release Date", "Popularity", "Ratings"];

  const [params, setParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [movieList, setMovieList] = useState<IMovieList[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [displayedList, setDisplayedList] = useState<IMovieList[]>([]);
  const [genreFilter, setGenreFilter] = useState<string[]>(
    JSON.parse(window.sessionStorage.getItem("filter") || "[]")
  );
  const [sortBy, setSortBy] = useState<string[]>(
    JSON.parse(window.sessionStorage.getItem("sort") || "[]")
  );
  const ref = useRef<HTMLInputElement>(null);

  const callData = async (page: number) => {
    setIsLoading(true);
    const popularMovie = await getPopularMovieList(page);
    if (popularMovie.data) {
      setMovieList(popularMovie.data.results);
      setDisplayedList(popularMovie.data.results);
      setTotalPage(popularMovie.data.total_pages);
    }
    setIsLoading(false);
  };

  const handleSearch = async (title: string, page: number) => {
    setIsLoading(true);
    setParams({ search: `${title}`, page: `${page}` });
    setMovieList([]);
    const searchedList = await getMovieBySearch(title, page);
    if (searchedList.data) {
      setMovieList(searchedList.data.results);
      setDisplayedList(searchedList.data.results);
      setTotalPage(searchedList.data.total_pages);
    }
    setSortBy(["Popularity"]);
    setIsLoading(false);
  };

  const handleSortAndFilter = () => {
    let displayedListArr: IMovieList[] = [];
    if (genreFilter.length == 0) {
      displayedListArr = [...movieList];
    } else {
      const filteredMovie = movieList.filter(
        (movie) =>
          movie.genre_ids
            .map((id) => genresList.find((list) => list.id === id)!.name)
            .filter((id) => genreFilter.includes(id)).length !== 0
      );
      displayedListArr = filteredMovie;
    }
    if (sortBy.length == 0) {
      setDisplayedList(displayedListArr);
    } else {
      switch (sortBy[0]) {
        case "Title":
          displayedListArr.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
          break;
        case "Release Date":
          displayedListArr.sort((a, b) => {
            const a1 = a.release_date.split("-").join("");
            const b1 = b.release_date.split("-").join("");
            return b1 > a1 ? 1 : b1 < a1 ? -1 : 0;
          });
          break;
        case "Popularity":
          displayedListArr.sort((a, b) => {
            return b.popularity - a.popularity;
          });
          break;
        case "Ratings":
          displayedListArr.sort((a, b) => {
            return (
              b.vote_average * b.vote_count - a.vote_average * a.vote_count
            );
          });
          break;
        default:
          break;
      }
    }
    setDisplayedList(displayedListArr);
  };

  // useEffect(() => {
  //   if (!params.has("search")) {
  //     callData(Number(params.get("page")));
  //   }
  // }, []);

  useEffect(() => {
    if (params.has("search")) {
      handleSearch(params.get("search")!, Number(params.get("page")));
    } else {
      callData(Number(params.get("page")));
    }
  }, [params]);

  useEffect(() => {
    handleSortAndFilter();
    window.sessionStorage.setItem("filter", JSON.stringify(genreFilter));
    window.sessionStorage.setItem("sort", JSON.stringify(sortBy));
  }, [genreFilter, sortBy, movieList]);

  return (
    <main className="my-16 mx-5 min-[425px]:mx-auto min-h-[80vh] flex flex-col items-center justify-start w-fit">
      <section
        id="searchBar"
        className="w-[80vw] flex justify-center gap-3 flex-wrap md:flex-nowrap"
      >
        <form
          className="flex gap-3 flex-grow max-w-[500px]"
          onSubmit={(e) => {
            e.preventDefault();
            setParams({
              search: (e.currentTarget[0] as HTMLInputElement).value,
              page: "1",
            });
            ref.current ? (ref.current.value = "") : "";
          }}
          autoComplete="off"
        >
          <input
            className="focus:outline-none focus:ring-0 rounded-full pl-5 bg-gray-700 text-white placeholder-gray-500 flex-grow max-w-[500px] border-0"
            type="text"
            placeholder="Enter title to search"
            ref={ref}
            required
          />
          <button
            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center focus:outline-none"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="flex gap-3">
          <div>
            <DropdownCheckbox
              textBtn="Category"
              listArr={genresList.map((genre) => genre.name)}
              state={genreFilter}
              setState={setGenreFilter}
              btnType="checkbox"
            />
          </div>
          <div>
            <DropdownCheckbox
              textBtn="Sort By"
              listArr={listForSortBy}
              state={sortBy}
              setState={setSortBy}
              btnType="radio"
            />
          </div>
        </div>
      </section>
      <section className="my-10 flex sm:gap-10 min-h-9 h-fit w-[80vw] sm:w-[60vw] justify-between max-w-[1200px]">
        {params.get("search")?.length ? (
          <div className="flex justify-between font-thin">
            <div>
              Search :
              <span
                className="bg-gray-700 rounded-full px-3 py-2 ml-3 text-sm inline-flex"
                key={params.get("search")}
              >
                {params.get("search")}
                <button
                  className="ml-3"
                  onClick={() => {
                    setParams({ page: "1" });
                    callData(Number(params.get("page")));
                  }}
                >
                  <RxCross2 />
                </button>
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
        {genreFilter.length ? (
          <div className="flex justify-between font-thin h-fit max-w-[50%]">
            <div className="h-fit">
              Filter :
              {genreFilter.map((genre) => (
                <span
                  className="bg-gray-700 rounded-full px-3 py-2 ml-3 text-sm inline-flex mb-3"
                  key={genre}
                >
                  {genre}
                  <button
                    className="ml-3"
                    onClick={() => {
                      setGenreFilter(genreFilter.filter((g) => g != genre));
                    }}
                  >
                    <RxCross2 />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {sortBy.length ? (
          <div className="flex justify-between font-thin">
            <div>
              Sort By :
              {sortBy.map((sort) => (
                <span
                  className="bg-gray-700 rounded-full px-3 py-2 ml-3 text-sm inline-flex"
                  key={sort}
                >
                  {sort}
                  <button
                    className="ml-3"
                    onClick={() => {
                      setSortBy(sortBy.filter((s) => s != sort));
                    }}
                  >
                    <RxCross2 />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
      <section
        className="grid flex-grow-0 justify-center gap-4 grid-col grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        // style={{
        //   gridTemplateColumns: `repeat(${Math.ceil(
        //     cardNum / 2
        //   )}, minmax(0, ${cardWidth}px))`,
        // }}
      >
        {isLoading ? (
          <>
            {cardCountArray.map((num) => {
              return (
                <div
                  key={num}
                  className="bg-gray-800 aspect-[2/3] animate-pulse"
                  style={{ width: `${window.innerWidth / (cardNum + 1)}px` }}
                ></div>
              );
            })}
          </>
        ) : displayedList.length ? (
          <>
            {displayedList
              //Filter duplicates from API
              .filter(
                (mov, index) =>
                  displayedList.findIndex((x) => x.id === mov.id) === index
              )
              //Filter no-poster movie
              .filter((mov) => mov.poster_path)
              .map((movie) => {
                return (
                  <div
                    className="justify-self-center "
                    style={{ maxWidth: `${cardWidth}px`, aspectRatio: "2/3" }}
                    key={movie.id}
                  >
                    <MovieCard
                      title={movie.title}
                      poster_path={movie.poster_path}
                      cardWidth={cardWidth}
                      id={movie.id}
                      key={movie.id}
                    />
                  </div>
                );
              })}
          </>
        ) : (
          <div
            className="flex flex-col justify-center flex-auto text-center min-h-[50vh]"
            style={{ gridColumn: `span ${Math.ceil(cardNum / 2)}` }}
          >
            <div className="text-[50px] flex justify-center mb-10">
              <LuSearchX />
            </div>
            <span>
              Sorry, we do not have movies that you are looking for . . .
            </span>
          </div>
        )}
      </section>
      <div className="flex mt-10 text-xl font-thin items-center gap-3">
        <button
          className="text-lg flex items-center p-2 m-2 rounded-full bg-transparent transition-all duration-400 hover:bg-gray-700"
          onClick={() => {
            window.scroll(0, 0);
            if (params.has("search")) {
              setParams({
                search: `${params.get("search")}`,
                page: `${
                  params.get("page") === "1"
                    ? 1
                    : Number(params.get("page")) - 1
                }`,
              });
            } else {
              setParams({
                page: `${
                  params.get("page") === "1"
                    ? 1
                    : Number(params.get("page")) - 1
                }`,
              });
            }
          }}
        >
          <IoIosArrowBack />
        </button>
        <span>
          {params.get("page")} /{" "}
          {totalPage! > 500 ? "500" : totalPage?.toLocaleString("en-US")}{" "}
        </span>
        <button
          className="text-lg flex items-center p-2 m-2 rounded-full bg-transparent transition-all duration-400 hover:bg-gray-700"
          onClick={() => {
            window.scroll(0, 0);
            if (params.has("search")) {
              setParams({
                search: `${params.get("search")}`,
                page: `${Number(params.get("page")) + 1}`,
              });
            } else {
              setParams({
                page: `${Number(params.get("page")) + 1}`,
              });
            }
          }}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </main>
  );
};

export default SearchPage;
