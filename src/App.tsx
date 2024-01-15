import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "./components/footer";
import NavBar from "./components/navBar";
import { useState } from "react";

// const favoriteListId = [572802, 787699, 976573, 1076364, 872585];

const App = () => {
  const [favList,setFavList] = useState([])
  return (
    <>
        <NavBar />
          <Outlet context={{ state : favList, setState: setFavList }}/>
        <Footer />
    </>
  );
};

export function useFavList(){
  return useOutletContext<{state: number[], setState: React.Dispatch<React.SetStateAction<number[]>>}>()
}
export default App;
