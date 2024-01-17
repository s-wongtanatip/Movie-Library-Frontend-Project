import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "./components/footer";
import NavBar from "./components/navBar";
import { useEffect, useState } from "react";

const App = () => {
  const [favList, setFavList] = useState<number[]>(JSON.parse( window.localStorage.getItem("favoriteMovie") || "[]" ));

  useEffect(() => {
      window.localStorage.setItem("favoriteMovie",JSON.stringify(favList))
  }, [favList]);

  useEffect(() => {
    console.log(favList);
  }, [favList]);
  return (
    <>
      <NavBar />
      <Outlet context={{ state: favList, setState: setFavList }} />
      <Footer />
    </>
  );
};

export function useFavList() {
  return useOutletContext<{
    state: number[];
    setState: React.Dispatch<React.SetStateAction<number[]>>;
  }>();
}
export default App;
