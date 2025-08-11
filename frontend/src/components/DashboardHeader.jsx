import { useApp } from "../contexts/AppContext";
import { FaStar } from "react-icons/fa";

export function DashboardHeader() {
  const { fontSize } = useApp();

  return (
    <div className="flex gap-6 items-center w-full px-95 mb-10">
      {/* Avatar */}
      <div
        className="w-20 h-20 bg-orange-400 text-white flex items-center justify-center font-bold rounded-full"
        style={{ fontSize: fontSize*1.5}}
      >
        M
      </div>

      {/* Text area */}
      <div className="flex flex-col gap-2" style={{ fontSize }}>
        <div className="font-bold tracking-wide" style={{ fontSize: fontSize * 2.25 }}>
          Welcome back, Mayank
        </div>

        <div className="flex items-center gap-4 flex-wrap" style={{ fontSize: fontSize * 0.9 }}>
          <div className="bg-orange-100 text-orange-800 rounded-lg px-3 py-1 font-medium">
            Pending Verification
          </div>

          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={fontSize} />
            ))}
          </div>

          <div className="text-gray-600">4.6 (5 reviews)</div>
        </div>
      </div>
    </div>
  );
}
