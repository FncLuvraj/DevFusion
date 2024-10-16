import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Body() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="flex-grow">
        <Outlet></Outlet> {/* The child routes will render over here */}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Body;
