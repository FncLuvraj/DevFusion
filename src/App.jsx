import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import { store } from "./redux/appstore";
import { Provider } from "react-redux";
import Connections from "./components/Connections";
import Request from "./components/Request";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar></NavBar>
          <div>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* Protected Routes */}
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<Request />} />
              {/* Body component */}
              <Route path="/" element={<Body />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
