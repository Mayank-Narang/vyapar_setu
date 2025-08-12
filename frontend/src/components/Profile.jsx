import { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";
import { useApp } from "../contexts/AppContext";

export default function Profile() {
  const { fontSize } = useApp();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = "64f1c1a9e13f2a0012345678";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <p className="text-center mt-8">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-center mt-8 text-red-500">Profile not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 overflow-x-hidden" style={{ fontSize }}>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h2>

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col sm:flex-row gap-6">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        ) : (
          <FaUserCircle size={120} className="text-gray-400" />
        )}

        <div className="flex-1 space-y-3">
          <h3 className="text-2xl font-semibold text-gray-800">{profile.name}</h3>
          <div className="flex items-center gap-3 text-gray-600">
            <FaEnvelope className="text-gray-500" /> {profile.email}
          </div>
          {profile.phone && (
            <div className="flex items-center gap-3 text-gray-600">
              <FaPhone className="text-gray-500" /> {profile.phone}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
