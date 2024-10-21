import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((store) => store.user);

  // Lift the state for user details up to the parent component
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    skills: [],
    profileImagePath: "",
  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        bio: user.bio || "",
        skills: user.skills || [],
        profileImagePath: user.profileImagePath || "",
      });
    }
  }, [user]);

  // Update the userDetails state
  const handleInputChange = (field, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-start md:items-stretch md:space-x-10 space-y-6 md:space-y-0 p-10 w-full max-w-screen-lg mx-auto">
      {/* UserCard - Left Column */}
      <div className="w-full md:w-[45%] shadow-lg rounded-lg h-full">
        <UserCard userData={userDetails} />
      </div>

      {/* EditProfile - Right Column */}
      <div className="w-full md:w-[45%] shadow-lg rounded-lg h-full flex">
        <EditProfile
          userDetails={userDetails}
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Profile;
