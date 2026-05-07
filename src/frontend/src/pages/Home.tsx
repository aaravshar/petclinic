import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { petsApi } from "../services/pets.api";
import { vaccinationsApi } from "../services/vaccinations.api";
import { PawPrint, Syringe, Calendar } from "lucide-react";

interface Pet {
  id: number;
  name: string;
  species: string;
}

interface Vaccination {
  id: number;
  vaccine_name: string;
  next_due_date: string | null;
  pet_id: number;
}

function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  useEffect(() => {
    petsApi.list().then(setPets);
    vaccinationsApi.list().then(setVaccinations);
  }, []);

  const upcomingVax = vaccinations.filter((v) => v.next_due_date);

  return (
    <div data-testid="home-page">
      <h1 className="text-3xl font-bold text-gray-800 mb-6" data-testid="home-title">
        Welcome to Vet Clinic
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6" data-testid="stat-pets">
          <div className="flex items-center gap-3">
            <PawPrint className="text-indigo-600" size={32} />
            <div>
              <p className="text-2xl font-bold">{pets.length}</p>
              <p className="text-gray-500">Registered Pets</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6" data-testid="stat-vaccinations">
          <div className="flex items-center gap-3">
            <Syringe className="text-green-600" size={32} />
            <div>
              <p className="text-2xl font-bold">{vaccinations.length}</p>
              <p className="text-gray-500">Vaccinations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6" data-testid="stat-upcoming">
          <div className="flex items-center gap-3">
            <Calendar className="text-orange-600" size={32} />
            <div>
              <p className="text-2xl font-bold">{upcomingVax.length}</p>
              <p className="text-gray-500">Upcoming Due</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6" data-testid="recent-pets">
        <h2 className="text-xl font-semibold mb-4">Recent Pets</h2>
        {pets.length === 0 ? (
          <p className="text-gray-500">No pets registered yet.</p>
        ) : (
          <ul className="space-y-2">
            {pets.slice(0, 5).map((pet) => (
              <li key={pet.id}>
                <Link
                  to={`/pets/${pet.id}`}
                  className="text-indigo-600 hover:underline"
                  data-testid={`pet-link-${pet.id}`}
                >
                  {pet.name} ({pet.species})
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
