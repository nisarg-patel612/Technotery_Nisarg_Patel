import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ Logout function (MISSING THA)
  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Admin Panel</h1>

      <button
        onClick={logout}
        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
