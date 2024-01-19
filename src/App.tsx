import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import Footer from "./components/footer";
import NavBar from "./components/navBar";
import { useEffect, useState } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const [favList, setFavList] = useState<number[]>(JSON.parse( window.localStorage.getItem("favoriteMovie") || "[]" ));

  useEffect(() => {
      window.localStorage.setItem("favoriteMovie",JSON.stringify(favList))
  }, [favList]);

  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Outlet context={{ favListState: favList, setFavListState: setFavList }} />
      <Footer />
    </>
  );
};

export function useFavList() {
  return useOutletContext<{
    favListState: number[];
    setFavListState: React.Dispatch<React.SetStateAction<number[]>>;
  }>();
}

export default App;
