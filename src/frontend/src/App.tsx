import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import PetsList from "./pages/PetsList";
import PetDetail from "./pages/PetDetail";
import AddPet from "./pages/AddPet";
import VisitDetail from "./pages/VisitDetail";
import VaccinationLog from "./pages/VaccinationLog";
import "./App.css";

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetsList />} />
          <Route path="/pets/new" element={<AddPet />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/visits/:id" element={<VisitDetail />} />
          <Route path="/vaccinations" element={<VaccinationLog />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
