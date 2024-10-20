import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adduser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skills, setSkills] = useState(""); // New field for skills
  const [bio, setBio] = useState(""); // New field for bio
  const [photoUrl, setPhotoUrl] = useState(""); // New field for photo URL
  const [isLoginForm, setIsLoginForm] = useState(true);
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
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong"); // Handle error message properly
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          email: emailId,
          password,
          skills: skills.split(",").map((skill) => skill.trim()), // Convert comma-separated string to array
          bio,
          profileImagePath: photoUrl, // Field for photo URL
        },
        { withCredentials: true }
      );
      dispatch(adduser(res.data.data)); // Add user data to Redux
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong"); // Handle error message properly
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const formType = query.get("form");
    if (formType === "signup") {
      setIsLoginForm(false); // Switch to sign-up form
    }
  }, [location.search]);

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                {/* First Name */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                {/* Last Name */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                {/* Skills */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Skills (comma-separated)</span>
                  </div>
                  <input
                    type="text"
                    value={skills}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </label>

                {/* Bio */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Bio</span>
                  </div>
                  <textarea
                    value={bio}
                    className="textarea textarea-bordered w-full max-w-xs"
                    onChange={(e) => setBio(e.target.value)}
                  />
                </label>

                {/* Photo URL */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </>
            )}

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
          <p className="text-red-500">{error}</p>

          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Toggle between Login and Signup */}
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
