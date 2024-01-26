import { Menu } from "@headlessui/react";

interface Props {
  textBtn: string;
  listArr: string[];
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  btnType: string;
}

const DropdownCheckbox = ({ textBtn, listArr,state, setState, btnType }: Props) => {
  return (
    <Menu>
      <Menu.Button className="text-white w-40 bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex justify-center items-center focus:outline-none">
        {textBtn}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </Menu.Button>
      <Menu.Items>
        <div className="z-10 w-40 bg-gray-700 divide-y divide-gray-100 rounded-lg shadow mt-2 absolute">
          <ul className="p-3 space-y-3 text-sm">
            {listArr.map((list, index) => {
              return (
                <div key={list} className="flex items-center text-slate-200">
                  <Menu.Item>
                    <>
                      <input
                        id={`checkbox-item-${index}`}
                        type="checkbox"
                        value={list}
                        checked={state.includes(list) ? true : false}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                        onChange={()=>{
                          switch (btnType) {
                            case "checkbox":
                              if (state.includes(list)){
                                setState(state.filter(s => (s != list)))
                              } else{
                                setState([...state, list])
                              }
                              break;
                            case "radio":
                              if (state.includes(list)){
                                setState([])
                              } else{
                                setState([list])
                              }
                              break;
                            default:
                              break;
                          }
                          
                        }}
                      />
                      <label
                        htmlFor={`checkbox-item-${index}`}
                        className="ms-2 text-sm font-medium"
                      >
                        {list}
                      </label>
                    </>
                  </Menu.Item>
                </div>
              );
            })}
          </ul>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default DropdownCheckbox;
