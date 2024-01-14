import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <>
      <NavBar />
        <Outlet />
      <Footer />
    </>
  );
};

export default App;
