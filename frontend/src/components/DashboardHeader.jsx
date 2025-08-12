import { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";

export function DashboardHeader() {
  const { fontSize } = useApp();
  const [user, setUser] = useState(null);

  // Ideally get this from auth context instead of hardcoding
  const userId = "64f1c1a9e13f2a0012345678";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <p>Loading header...</p>;
  }

  return (
    <div className="flex gap-6 items-center w-full px-95 mb-10">
      {/* Avatar */}
      <div
        className="w-20 h-20 bg-orange-400 text-white flex items-center justify-center font-bold rounded-full"
        style={{ fontSize: fontSize * 1.5 }}
      >
        {user.name ? user.name.charAt(0).toUpperCase() : "?"}
      </div>

      {/* Text area */}
      <div className="flex flex-col gap-2" style={{ fontSize }}>
        <div
          className="font-bold tracking-wide"
          style={{ fontSize: fontSize * 2.25 }}
        >
          Welcome back, {user.name}
        </div>

        <div
          className="flex items-center gap-4 flex-wrap"
          style={{ fontSize: fontSize * 0.9 }}
        >
          <div className="bg-orange-100 text-orange-800 rounded-lg px-3 py-1 font-medium">
            Pending Verification
          </div>

        </div>
      </div>
    </div>
  );
}
