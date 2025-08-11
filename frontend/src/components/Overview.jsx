import { useApp } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import { FaFileAlt, FaChartLine, FaStar, FaBuilding } from "react-icons/fa";

export default function Overview() {
  const { fontSize, user } = useApp();
  const [userListings, setUserListings] = useState([]);
  const [globalListings, setGlobalListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, globalRes] = await Promise.all([
          fetch(`http://localhost:5000/api/user-listings/${user.id}`),
          fetch(`http://localhost:5000/api/listings`)
        ]);

        if (!userRes.ok || !globalRes.ok) {
          throw new Error("Failed to fetch listings");
        }

        const userData = await userRes.json();
        const globalData = await globalRes.json();

        setUserListings(userData);
        setGlobalListings(globalData);
      } catch (err) {
        console.error("Error fetching overview data:", err);
      } finally {
        setLoading(false);
      }
    }
    if (user?.id) fetchData();
  }, [user?.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ fontSize }} className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border border-gray-200">
          <FaFileAlt className="text-orange-500 text-3xl" />
          <div>
            <h3 className="text-orange-500 font-semibold">Active Listings</h3>
            <p className="text-4xl font-bold mt-1">{userListings.length}</p>
            <p className="text-gray-500">Currently available</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border border-gray-200">
          <FaChartLine className="text-orange-500 text-3xl" />
          <div>
            <h3 className="text-orange-500 font-semibold">Total Deals</h3>
            <p className="text-4xl font-bold mt-1">0</p>
            <p className="text-gray-500">Completed successfully</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border border-gray-200">
          <FaStar className="text-orange-500 text-3xl" />
          <div>
            <h3 className="text-orange-500 font-semibold">Customer Rating</h3>
            <p className="text-4xl font-bold mt-1">4.6</p>
            <p className="text-gray-500">Based on 5 reviews</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
        <h3 className="text-orange-500 font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <FaBuilding className="text-orange-500 text-xl" />
                </div>
                <div>
                  <p className="font-semibold">{listing.title}</p>
                  <p className="text-gray-500 text-sm">{listing.location}</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {listing.status || "Available"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}