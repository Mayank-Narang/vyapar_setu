import { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { FaEdit, FaComments } from "react-icons/fa";

export default function MyListings() {
  const { fontSize } = useApp();
  const [listings, setListings] = useState([]);
  const userId = "64f1c1a9e13f2a0012345678";    

  const statusColors = {
    Available: "bg-green-100 text-green-700",
    "Under Discussion": "bg-yellow-100 text-yellow-700",
    Booked: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    fetch(`/api/my-listings/${userId}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, [userId]);

  return (
    <div style={{ fontSize }} className="max-w-7xl mx-auto px-4 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Listings</h2>
        <button className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition font-medium">
          + Create New Listing
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div key={listing._id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition">
            <div className="relative">
              <img
                src={listing.image || "/images/placeholder.jpg"}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[listing.status]}`}>
                {listing.status}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <h3 className="font-bold text-lg text-gray-800 leading-tight line-clamp-2">{listing.title}</h3>
              <p className="text-gray-600 text-sm leading-snug line-clamp-3">{listing.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3 mt-2">
                <span className="truncate">{listing.location}</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">{listing.category}</span>
              </div>
            </div>

            <div className="flex border-t divide-x">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-orange-50 transition">
                <FaEdit className="text-orange-400" /> <span>Edit</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-orange-50 transition">
                <FaComments className="text-orange-400" /> <span>Chats</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
