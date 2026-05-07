import { Link, useLocation } from "react-router-dom";
import { Home, PawPrint, Plus, Syringe } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/pets", label: "Pets", icon: <PawPrint size={20} /> },
    { to: "/pets/new", label: "Add Pet", icon: <Plus size={20} /> },
    { to: "/vaccinations", label: "Vaccinations", icon: <Syringe size={20} /> },
  ];

  return (
    <aside className="sidebar bg-indigo-900 text-white p-4 flex flex-col" data-testid="sidebar">
      <h1 className="text-xl font-bold mb-8 text-center" data-testid="app-title">
        🐾 Vet Clinic
      </h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            data-testid={`nav-${link.label.toLowerCase().replace(" ", "-")}`}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === link.to
                ? "bg-indigo-700 text-white"
                : "text-indigo-200 hover:bg-indigo-800"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
