import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";

const ProfileField = ({ label, value, isEditing, isEditable = true, onChange, type = "input" }) => (
  <div>
    <label className="text-sm font-semibold text-orange-600">{label}</label>
    {isEditing && isEditable ? (
        type === 'textarea' ? (
            <textarea
                value={value || ''}
                onChange={onChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
        ) : (
            <input
                type="text"
                value={value || ''}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
        )
    ) : (
      <p className="mt-1 text-gray-800 h-10 flex items-center">{value || "N/A"}</p>
    )}
  </div>
);

export default function CompanyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const userId = "64f1c1a9e13f2a0012345678"; 

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/profile/${userId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      const updatedProfile = await res.json();
      setProfile(updatedProfile);
      setFormData(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
      setIsEditing(false);
      setFormData(profile); 
  };

  if (loading && !profile) return <p className="text-center mt-8">Loading...</p>;
  if (!profile) return <p className="text-center mt-8 text-red-500">Profile not found</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-orange-500">Company Profile</h2>
          {/* Show Edit button or Save/Cancel buttons */}
          {isEditing ? (
            <div className="flex gap-3">
              <button onClick={handleUpdateProfile} disabled={loading} className="px-5 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-yelorangelow-600 disabled:bg-orange-300">
                {loading ? "Saving..." : "Save"}
              </button>
              <button onClick={handleCancel} className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-100">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-600 rounded-md text-sm font-medium hover:bg-orange-50">
              <FaPen /> Edit Profile
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {/* Editable Fields */}
            <ProfileField label="Company Name" value={formData.name} isEditing={isEditing} onChange={(e) => handleInputChange(e, 'name')} />
            {/* Non-Editable Fields */}
            <ProfileField label="Industry" value={formData.industry} isEditing={isEditing} isEditable={false} />
            <ProfileField label="Contact Email" value={formData.email} isEditing={isEditing} onChange={(e) => handleInputChange(e, 'email')} />
            <ProfileField label="GST Number" value={formData.gstNumber} isEditing={isEditing} isEditable={false} />
            <ProfileField label="Contact Phone" value={formData.phone} isEditing={isEditing} onChange={(e) => handleInputChange(e, 'phone')} />
            <ProfileField label="PAN Number" value={formData.panNumber} isEditing={isEditing} isEditable={false} />
          </div>
          
          {/* Full-width fields */}
          <ProfileField label="Company Address" value={formData.address} isEditing={isEditing} onChange={(e) => handleInputChange(e, 'address')} type="textarea" />
          <ProfileField label="Company Description" value={formData.description} isEditing={isEditing} onChange={(e) => handleInputChange(e, 'description')} type="textarea" />
        </div>
      </div>
    </div>
  );
}
