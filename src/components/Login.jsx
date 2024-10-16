import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adduser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

function Login() {
  const [email, setemail] = useState("john.doe@example.com");
  const [password, setpassword] = useState("Password123!");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLoginClick() {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(adduser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-center mt-10 mb-10">
      <div className="card bg-primary shadow-lg rounded-lg w-96 p-8">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center text-white mb-6">
            Login
          </h2>

          {/* email */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-black">What is your Email?</span>
              {/* TODO */}
              {/* <span className="label-text-alt">forgot email</span> */}
            </div>
            <input
              type="text"
              value={email}
              placeholder="Enter here"
              className="input input-bordered w-full max-w-xs bg-slate-50"
              onChange={(e) => setemail(e.target.value)}
            />
          </label>

          {/* password */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-black">
                What is your Password?
              </span>
              {/* TODO */}
              {/* <span className="label-text-alt">forgot password</span> */}
            </div>
            <input
              type="password"
              value={password}
              placeholder="Enter here"
              className="input input-bordered w-full max-w-xs bg-slate-50"
              onChange={(e) => setpassword(e.target.value)}
            />
          </label>
          {/* Login Button */}
          <button
            className="btn glass text-black hover:text-white mt-4"
            onClick={handleLoginClick}
          >
            {" "}
            Login{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
