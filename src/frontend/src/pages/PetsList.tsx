import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { petsApi } from "../services/pets.api";
import { Search, PawPrint } from "lucide-react";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  birth_date: string | null;
  microchip_id: string;
}

function PetsList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async (searchTerm?: string) => {
    const data = await petsApi.list(searchTerm);
    setPets(data);
  };

  const handleSearch = () => {
    loadPets(search || undefined);
  };

  return (
    <div data-testid="pets-list-page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800" data-testid="pets-title">
          Pets
        </h1>
        <Link
          to="/pets/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          data-testid="add-pet-btn"
        >
          + Add Pet
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search pets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            data-testid="search-input"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          data-testid="search-btn"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <Link
            key={pet.id}
            to={`/pets/${pet.id}`}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            data-testid={`pet-card-${pet.id}`}
          >
            <div className="flex items-center gap-3">
              <PawPrint className="text-indigo-600" size={24} />
              <div>
                <h3 className="font-semibold text-lg" data-testid={`pet-name-${pet.id}`}>
                  {pet.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {pet.species} {pet.breed && `• ${pet.breed}`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {pets.length === 0 && (
        <p className="text-center text-gray-500 mt-8" data-testid="no-pets-message">
          No pets found.
        </p>
      )}
    </div>
  );
}

export default PetsList;
