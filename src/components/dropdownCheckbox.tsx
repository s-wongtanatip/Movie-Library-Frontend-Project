const DropdownCheckbox = () => {
  return (
    <>
      <button
        id="dropdownCheckboxButton"
        data-dropdown-toggle="dropdownDefaultCheckbox"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Dropdown checkbox{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownDefaultCheckbox"
        className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
      >
        <ul
          className="p-3 space-y-3 text-sm text-gray-700"
          aria-labelledby="dropdownCheckboxButton"
        >
          <li>
            <div className="flex items-center">
              <input
                id="checkbox-item-1"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
              />
              <label
                htmlFor="checkbox-item-1"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default checkbox 1
              </label>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropdownCheckbox;
