import { useEffect } from "react";
import { BASE_URL } from "../../src/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/connectionSlice";
import UserCard from "./UserCard"; // Assuming you have the correct path

function Connections() {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);

  async function fetchConnections() {
    try {
      const res = await axios.get(BASE_URL + "/receivedConnectionRequests", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection || connection.length === 0) {
    return (
      <h1 className="flex justify-center items-center text-5xl mt-[100px]">
        No Connection found
      </h1>
    );
  }

  return (
    <div>
      {connection.map((user) => (
        <UserCard
          key={user._id}
          userData={user.senderUserId}
          isReceiver={true}
          isActionTaken={false}
          onAccept={() => console.log("Accepted")}
          onReject={() => console.log("Rejected")}
        />
      ))}
    </div>
  );
}

export default Connections;
