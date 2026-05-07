import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { petsApi } from "../services/pets.api";

function AddPet() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    birth_date: "",
    microchip_id: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pet = await petsApi.create({
      ...form,
      birth_date: form.birth_date || null,
      owner_id: null,
    });
    navigate(`/pets/${pet.id}`);
  };

  return (
    <div data-testid="add-pet-page">
      <h1 className="text-3xl font-bold text-gray-800 mb-6" data-testid="add-pet-title">
        Add New Pet
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-lg" data-testid="add-pet-form">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              data-testid="pet-name-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
            <input
              type="text"
              value={form.species}
              onChange={(e) => setForm({ ...form, species: e.target.value })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              data-testid="pet-species-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
            <input
              type="text"
              value={form.breed}
              onChange={(e) => setForm({ ...form, breed: e.target.value })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              data-testid="pet-breed-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
            <input
              type="date"
              value={form.birth_date}
              onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              data-testid="pet-birthdate-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Microchip ID</label>
            <input
              type="text"
              value={form.microchip_id}
              onChange={(e) => setForm({ ...form, microchip_id: e.target.value })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              data-testid="pet-microchip-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              rows={3}
              data-testid="pet-notes-input"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium"
          data-testid="pet-submit-btn"
        >
          Add Pet
        </button>
      </form>
    </div>
  );
}

export default AddPet;
