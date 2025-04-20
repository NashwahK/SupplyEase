import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFirstName(localStorage.getItem("firstName") || "");
    setLastName(localStorage.getItem("lastName") || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setError("Unable to retrieve user info.");
      return;
    }

    const { error: insertError } = await supabase.from("Users").insert([
      {
        user_id: user.id,
        user_firstname: firstName,
        user_lastname: lastName,
        user_email: user.email,
        user_city: city,
      },
    ]);

    if (insertError) {
      setError("Failed to save profile: " + insertError.message);
      return;
    }
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");

    navigate("/dashboard");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          First Name:
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Last Name:
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          City:
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
