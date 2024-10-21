import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../src/constants";
import UserCard from "./UserCard"; // Ensure correct path
import Navbar from "./Navbar";

function Feed() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current profile index

  // Fetch user feed
  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true, // Ensure the user is authenticated
      });

      if (res.status === 200 && res.data.success) {
        if (res.data.data.length === 0) {
          console.log("No more profiles available.");
        }
        setUsers(res.data.data); // Set the users data from the response
      } else {
        console.log("Error fetching feed:", res.data.message);
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  useEffect(() => {
    fetchFeed(); // Fetch the feed on component mount
  }, []);

  // Handle "Interested" click
  const handleInterested = async () => {
    const currentUser = users[currentIndex];

    try {
      // Send the 'Interested' request to the backend
      const response = await axios.post(
        `${BASE_URL}/sendConnectionRequest/interested/${currentUser._id}`,
        null,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Request sent successfully to", currentUser.firstName);
        showNextProfile();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error:", error.response.data.message || "Bad request");
      } else {
        console.log("Error:", error.message);
      }
      showNextProfile(); // Still move to the next profile even on error
    }
  };

  // Handle "Ignore" click
  const handleIgnore = () => {
    showNextProfile(); // Move to the next profile without sending any request
  };

  // Show the next profile
  const showNextProfile = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next profile
    } else {
      console.log("No more profiles to show");
      setCurrentIndex(-1); // No profiles left
    }
  };

  // If there are no more profiles left to show
  if (currentIndex === -1 || !users.length) {
    return (
      <h1 className="flex justify-center items-center text-5xl mt-[100px]">
        No more profiles available!
      </h1>
    );
  }

  // Show one profile at a time
  const currentUser = users[currentIndex];

  return (
    <div>
      <div className="flex justify-center items-center mt-[80px]">
        <UserCard
          key={currentUser._id}
          userData={currentUser}
          isReceiver={true} // Assuming the logged-in user is receiving the requests
          isActionTaken={false} // Pass false as no action is taken yet
          onAccept={handleInterested} // Handle accept
          onReject={handleIgnore} // Handle reject
        />
      </div>
    </div>
  );
}

export default Feed;
