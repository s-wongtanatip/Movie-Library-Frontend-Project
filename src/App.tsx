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
  // Random movie to display on backdrop
  const movieDispNum = 5;

  const randNumArr = [...Array(movieDispNum)].map(()=>Math.floor(Math.random() * 20));
  const randNumArrUnique = randNumArr.map((n,index) => {
    if(randNumArr.indexOf(n) !== index){
      return [0,1,2,3,4,5,6,7].filter(n => !randNumArr.includes(n))[index - randNumArr.indexOf(n) - 1]
    }else{
      return n
    }
  })
  
  const [favList, setFavList] = useState<number[]>(JSON.parse( window.localStorage.getItem("favoriteMovie") || "[]" ));
  const [randNum, setRandNum] = useState<number[]>(randNumArrUnique)

  useEffect(() => {
      window.localStorage.setItem("favoriteMovie",JSON.stringify(favList))
  }, [favList]);

  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Outlet context={{ favListState: favList, setFavListState: setFavList, randCount: movieDispNum,randNum: randNum, setRandNum: setRandNum }} />
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

export function useRandNum() {
  return useOutletContext<{
    randCount: number;
    randNum: number[];
    setRandNum: React.Dispatch<React.SetStateAction<number[]>>;
  }>();
}

export default App;
