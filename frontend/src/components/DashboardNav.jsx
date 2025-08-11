import { useApp } from "../contexts/AppContext";
import { useState } from "react";
import Overview from "./Overview";
import MyListings from "./MyListings";
import Profile from "./Profile";
import Reviews from "./Reviews";

export function DashboardNav() {
  const { fontSize } = useApp();

  const [activeTab, setActiveTab] = useState("Overview");

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
      case "My Listings":
        return <MyListings />;
      case "Profile":
        return <Profile />;
      case "Reviews":
        return <Reviews />;
      default:
        return <Overview />;
    }
  };

  const tabs = ["Overview", "My Listings", "Profile", "Reviews"];

  return (
    <div>
      {/* Tabs */}
      <div className="flex w-7xl justify-between bg-gray-100 rounded-lg overflow-hidden mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ fontSize :fontSize *1.5}}
            className={`px-20 py-3 w-full cursor-pointer font-medium transition-colors duration-200 ${
              activeTab === tab
                ? "bg-orange-400 text-white rounded"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div style={{ fontSize }}>{renderContent()}</div>
    </div>
  );
}
