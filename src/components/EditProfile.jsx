import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "../../src/constants";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { adduser } from "../redux/userSlice";

function EditProfile({ userDetails, onInputChange }) {
  const dispatch = useDispatch();

  // State to control toast visibility
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Send the updated userDetails to the server
      const response = await axios.patch(BASE_URL + "/update", userDetails, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Set toast message
        setToastMessage("Profile updated successfully!");

        // Show toast
        setToastVisible(true);

        // Hide toast after 3 seconds
        setTimeout(() => {
          setToastVisible(false);
        }, 3000);

        dispatch(adduser(response.data.data)); // Update the Redux state with the new user data
      } else {
        setToastMessage("Failed to update profile. Please try again.");
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setToastMessage("An error occurred while updating the profile.");
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    }
  }

  return (
    <div className="flex justify-center items-center">
      {/* Toast Message */}
      {toastVisible && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title text-2xl">Profile Update</h2>
          <form onSubmit={handleSubmit}>
            {/* First Name Input */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">
                  What is your First Name?
                </span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                value={userDetails.firstName || ""}
                onChange={(e) => onInputChange("firstName", e.target.value)}
                required
              />
            </label>

            {/* Last Name Input */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">
                  What is your Last Name?
                </span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                value={userDetails.lastName || ""}
                onChange={(e) => onInputChange("lastName", e.target.value)}
              />
            </label>

            {/* Email Input */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">
                  What is your Email?
                </span>
              </div>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                value={userDetails.email || ""}
                onChange={(e) => onInputChange("email", e.target.value)}
                required
              />
            </label>

            {/* Skills Input */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">
                  What are your Skills?
                </span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                value={userDetails.skills ? userDetails.skills.join(",") : ""}
                onChange={(e) =>
                  onInputChange("skills", e.target.value.split(","))
                }
              />
            </label>

            {/* Photo URL Input */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">
                  Add your photo URL
                </span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                value={userDetails.profileImagePath || ""}
                onChange={(e) =>
                  onInputChange("profileImagePath", e.target.value)
                }
              />
            </label>

            {/* Bio Textarea */}
            <label className="form-control">
              <div className="label">
                <span className="label-text text-white">Add Your Bio</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 bg-white"
                placeholder="Bio"
                value={userDetails.bio || ""}
                onChange={(e) => onInputChange("bio", e.target.value)}
              />
            </label>

            {/* Submit Button */}
            <div className="card-actions justify-center mt-4">
              <button
                type="submit"
                className="btn glass bg-slate-800 text-white w-[100px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

EditProfile.propTypes = {
  userDetails: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default EditProfile;
