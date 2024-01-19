import { useState } from "react";
import { cardNum } from "../landingPage/landingPage";
import DropdownCheckbox from "../../components/dropdownCheckbox";

const SearchPage = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  return (
    <main className="my-16 mx-10 min-h-[80vh] flex flex-col">
      <section id="searchBar" className="mb-10 flex justify-center">
        <input
          className="focus:outline-none text-black"
          value={searchKey}
          placeholder="Enter title to search"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <div>
          <DropdownCheckbox/>
        </div>
      </section>
      <section
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cardNum}, minmax(0, 1fr))` }}
      >
        <div
          className="bg-gray-800 aspect-[2/3] animate-pulse"
          style={{ width: `${window.innerWidth / (cardNum + 1)}px` }}
        ></div>
      </section>
    </main>
  );
};

export default SearchPage;
