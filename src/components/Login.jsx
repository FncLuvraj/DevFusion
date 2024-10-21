import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adduser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../src/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(adduser(res.data.data)); // Add user data to Redux
      return navigate("/feed"); // Redirect to feed after login
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            {/* Email */}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            {/* Password */}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {/* Error Message */}

          <p className="text-red-600">{error}</p>

          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
          {/* Redirect to Signup */}
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => navigate("/signup")}
          >
            New User? Signup Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
