
import { Search, LayoutGrid, AlertTriangle, UserPlus, Minus, Plus, RotateCcw } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function NavBar() {
  const { currentPage, setCurrentPage, fontSize, changeFontSize, resetFontSize } = useApp();

  const pages = [
    { name: "Discover", icon: <Search size={16} />, api: "discover" },
    { name: "Dashboard", icon: <LayoutGrid size={16} />, api: "dashboard" },
    { name: "Raise a Complaint", icon: <AlertTriangle size={16} />, api: "complaint" },
    { name: "Register", icon: <UserPlus size={16} />, api: "register" }
  ];

  const handleClick = (page) => {
    setCurrentPage(page);
    fetch(`/api/${page}`)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("Fetch error:", err));
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow" style={{ fontSize: `${fontSize}px` }}>
      {/* Logo */}
      <div className="text-3xl font-bold text-orange-400">Vyapar Setu</div>

      {/* Menu */}
      <ul className="flex items-center gap-6">
        {pages.map((p) => (
          <li key={p.api}>
            <button
              onClick={() => handleClick(p.api)}
              className={`flex text-xl items-center gap-1 px-3 py-1 rounded transition-colors cursor-pointer ${
                currentPage === p.api 
                  ? 'bg-orange-400 text-white' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              {p.icon}
              {p.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Font size controls */}
      <div className="flex items-center gap-2 text-gray-700">
        <span className="text-xl">Font Size:</span>
        <button
          onClick={() => changeFontSize(-1)}
          className="border border-orange-400 text-orange-400 p-2 rounded hover:bg-orange-100"
        >
          <Minus size={14} />
        </button>
        <span className="w-10 text-center">{fontSize}px</span>
        <button
          onClick={() => changeFontSize(1)}
          className="border border-orange-400 text-orange-400 p-2 rounded hover:bg-orange-100"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={resetFontSize}
          className="border border-orange-400 text-orange-400 p-2 rounded hover:bg-orange-100"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </nav>
  );
}
