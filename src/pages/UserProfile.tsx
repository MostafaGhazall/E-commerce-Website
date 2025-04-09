const UserProfile = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">User Profile</h1>
      <div className="mt-4">
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <button className="bg-blue-500 text-white p-2 mt-4">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
