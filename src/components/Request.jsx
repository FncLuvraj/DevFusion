import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../src/constants";
import UserCard from "./UserCard";

function Request() {
  const [requests, setRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track which request to show

  // Fetch received requests when component mounts
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/receivedConnectionRequests", {
        withCredentials: true, // Ensure user is authenticated
      });

      if (res.status === 200 && res.data.success) {
        setRequests(res.data.data); // Store the connection requests
      } else {
        console.log("Error fetching requests:", res.data.message);
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []); // Fetch requests on component mount

  // Handle "Accept" button
  const handleAccept = async (requestId) => {
    try {
      await axios.patch(
        BASE_URL + `/respondToConnection/accepted/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Request accepted");
      showNextRequest();
    } catch (err) {
      console.log("Error accepting request:", err.message);
    }
  };

  // Handle "Reject" button
  const handleReject = async (requestId) => {
    try {
      await axios.patch(
        BASE_URL + `/respondToConnection/rejected/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Request rejected");
      showNextRequest();
    } catch (err) {
      console.log("Error rejecting request:", err.message);
    }
  };

  // Show next request
  const showNextRequest = () => {
    if (currentIndex < requests.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(-1); // No more requests
    }
  };

  if (currentIndex === -1 || requests.length === 0) {
    return (
      <h1 className="flex justify-center items-center text-5xl mt-[100px]">
        No more requests
      </h1>
    );
  }

  const currentRequest = requests[currentIndex];

  return (
    <div className="flex items-center justify-center mt-[80px]">
      <UserCard
        key={currentRequest._id}
        userData={currentRequest.senderUserId}
        onAccept={() => handleAccept(currentRequest._id)}
        onReject={() => handleReject(currentRequest._id)}
        isReceiver={true} // Show as a received request
        isActionTaken={false} // No action taken yet
      />
    </div>
  );
}

export default Request;
