import { useState } from "react";
import { Search, LayoutGrid, AlertTriangle, UserPlus, Minus, Plus, RotateCcw } from "lucide-react";

export function NavBar() {
  const [fontSize, setFontSize] = useState(16);

  const pages = [
    { name: "Discover", icon: <Search size={16} />, api: "discover" },
    { name: "Dashboard", icon: <LayoutGrid size={16} />, api: "dashboard" },
    { name: "Raise a Complaint", icon: <AlertTriangle size={16} />, api: "complaint" },
    { name: "Register", icon: <UserPlus size={16} />, api: "register" }
  ];

  const handleClick = (page) => {
    fetch(`/api/${page}`)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("Fetch error:", err));
  };

  const changeFontSize = (delta) => {
    setFontSize((size) => Math.max(10, size + delta));
  };

  const resetFontSize = () => setFontSize(16);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
      {/* Logo */}
      <div className="text-xl font-bold text-orange-500">Vyapar Setu</div>

      {/* Menu */}
      <ul className="flex items-center gap-6" style={{ fontSize: `${fontSize}px` }}>
        {pages.map((p) => (
          <li key={p.api}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick(p.api);
              }}
              className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition-colors"
            >
              {p.icon}
              {p.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Font size controls */}
      <div className="flex items-center gap-2 text-gray-700">
        <span className="text-sm">Font Size:</span>
        <button
          onClick={() => changeFontSize(-1)}
          className="border border-orange-400 text-orange-500 px-2 rounded hover:bg-orange-100"
        >
          <Minus size={14} />
        </button>
        <span className="w-10 text-center">{fontSize}px</span>
        <button
          onClick={() => changeFontSize(1)}
          className="border border-orange-400 text-orange-500 px-2 rounded hover:bg-orange-100"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={resetFontSize}
          className="border border-orange-400 text-orange-500 px-2 rounded hover:bg-orange-100"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </nav>
  );
}
