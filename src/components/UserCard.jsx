function UserCard({ userData, onAccept, onReject, isReceiver }) {
  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="card glass w-80 md:w-96 rounded-lg shadow-lg overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
      {/* User Image */}
      <figure className="w-full h-64">
        <img
          src={userData.profileImagePath || "https://via.placeholder.com/150"}
          alt="user avatar"
          className="w-full h-full object-cover filter brightness-90"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body text-center p-6">
        {/* Name */}
        <h2 className="card-title text-3xl font-bold text-white">
          {userData.firstName || "Unknown"} {userData.lastName || "User"}
        </h2>

        {/* Bio */}
        <p className="text-primary mb-4 text-xl font-semibold text-primary">
          {userData.bio || "No bio available"}
        </p>

        {/* Skills Section */}
        <div className="text-left">
          <h3 className="font-bold text-lg mb-2 text-white">Skills</h3>
          <ul className="list-disc ml-4 text-sm text-primary">
            {userData.skills?.length > 0 ? (
              userData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            ) : (
              <li>No skills available</li>
            )}
          </ul>

          {/* Email */}
          <p className="mt-4 text-sm text-[#FFFFFF]">
            Email:{" "}
            <a
              href={`mailto:${userData.email}`}
              className="underline hover:text-[#FFD700]"
            >
              {userData.email || "No email available"}
            </a>
          </p>
        </div>

        {/* Interested/Ignore Buttons */}
        {isReceiver && (
          <div className="card-actions justify-between mt-6">
            <button
              className="btn glass bg-primary text-black w-[120px] hover:bg-transparent hover:text-white"
              onClick={onReject} // Call the reject handler
            >
              Ignore
            </button>
            <button
              className="btn glass bg-primary text-black w-[120px] hover:bg-transparent hover:text-white"
              onClick={onAccept} // Call the accept handler
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;
