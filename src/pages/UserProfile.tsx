const UserProfile = () => {
  return (
    <div className="bg-white min-h-screen text-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="space-y-2">
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <button className="bg-theme text-white px-4 py-2 rounded mt-4 hover:bg-opacity-90 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
