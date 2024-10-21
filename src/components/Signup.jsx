import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../src/constants";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Clear error after 3 seconds
      }, 2000);

      // Cleanup timer if the component is unmounted or the error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          email: emailId,
          password,
          skills: skills.split(",").map((skill) => skill.trim()),
          bio,
          profileImagePath: photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(adduser(res.data.data)); // Add user data to Redux
      if (res.data.status == 200) {
        return navigate("/login"); // Redirect to login after signup
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>
          <div>
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
          <div className="toast toast-top toast-start">
            <div className="alert alert-info">
              <span>{error}</span>
            </div>
          </div>

          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>

          {/* Redirect to Login */}
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => navigate("/login")}
          >
            Existing User? Login Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
