import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../../src/constants";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../redux/userSlice";
import { useEffect } from "react";
import developers from "../assets/developers-together.jpg";
import devsCollab from "../assets/devs-collab.png";
import findingDevs from "../assets/finding-coding-partner.jpg";
import feature3 from "../assets/feature3.jpg";
import team from "../assets/team.jpg";
import { Link } from "react-router-dom";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profileview", {
        withCredentials: true,
      });
      dispatch(adduser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="relative">
      {/* Image with overlay */}
      <div className="relative h-screen w-full">
        <img
          src={developers}
          className="h-full w-full object-cover blur-lg"
          alt="developers working"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          {/* Main Heading */}
          <h1 className="text-8xl font-extrabold text-yellow-500 mb-6">
            MAKE THE NEXT MOVE
          </h1>

          {/* Call to Action Buttons */}
          <div className="flex space-x-4">
            {" "}
            <Link to="/signup">
              <button className="bg-white text-black py-2 px-4 rounded-full font-semibold hover:bg-gray-200">
                Sign up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-transparent border border-white text-white py-2 px-4 rounded-full font-semibold hover:bg-white hover:text-black">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-8xl font-extrabold text-center mt-20 mb-24 text-primary">
          WE'RE NOT JUST ABOUT CODE
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {/* Feature 1 */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={devsCollab}
              alt="Collaborating developers"
              className="w-full h-58 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                Collaborate with Developers
              </h2>
              <p className="text-gray-600">
                Work with developers on projects and build together. Explore
                unique opportunities for collaboration in tech.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={findingDevs}
              alt="Find coding partners"
              className="w-full h-58 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Find Coding Partners</h2>
              <p className="text-gray-600">
                Meet developers like you or explore new ways of learning
                together. Create meaningful connections and code as a team.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={feature3}
              alt="Advance your career"
              className="w-full h-58 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                Advance Your Career in Tech
              </h2>
              <p className="text-gray-600">
                Leverage your network to find mentors, new job opportunities,
                and expand your career in technology.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*Section 3 */}
      <div className="bg-yellow-500 min-h-screen flex items-center justify-center px-4 md:px-20">
        {/* Main container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={team}
              alt="Smiling developer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Text and Call-to-Action */}
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-extrabold text-gray-900 mb-4">
              Make Your First Contribution
            </h1>
            <p className="text-lg text-gray-800 mb-6">
              Join a thriving community of developers and make your first
              contribution to an open-source project. Collaborate, learn, and
              build something great together.
            </p>

            <Link to="/signup">
              <button className="bg-gray-900 text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-700">
                Start Contributing
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
export default Body;
