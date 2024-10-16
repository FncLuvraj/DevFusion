import "./App.css";
import "./index.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
("./components/Navbar");
function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body></Body>}>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/profile" element={<Profile></Profile>} /> /
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
