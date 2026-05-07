import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { petsApi } from "../services/pets.api";
import { visitsApi } from "../services/visits.api";
import { vaccinationsApi } from "../services/vaccinations.api";
import { Calendar, Syringe, FileText } from "lucide-react";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  birth_date: string | null;
  owner_id: number | null;
  microchip_id: string;
  notes: string;
  created_at: string;
}

interface Visit {
  id: number;
  visit_date: string;
  reason: string;
  diagnosis: string;
}

interface Vaccination {
  id: number;
  vaccine_name: string;
  administered_date: string;
  next_due_date: string | null;
}

function PetDetail() {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showVaxForm, setShowVaxForm] = useState(false);
  const [visitForm, setVisitForm] = useState({ visit_date: "", reason: "", diagnosis: "", treatment: "" });
  const [vaxForm, setVaxForm] = useState({ vaccine_name: "", administered_date: "", next_due_date: "", lot_number: "" });

  useEffect(() => {
    if (id) {
      petsApi.get(Number(id)).then(setPet);
      visitsApi.listForPet(Number(id)).then(setVisits);
      vaccinationsApi.list().then((all) => setVaccinations(all.filter((v: Vaccination & { pet_id: number }) => v.pet_id === Number(id))));
    }
  }, [id]);

  const handleAddVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await visitsApi.create(Number(id), visitForm);
    const updated = await visitsApi.listForPet(Number(id));
    setVisits(updated);
    setShowVisitForm(false);
    setVisitForm({ visit_date: "", reason: "", diagnosis: "", treatment: "" });
  };

  const handleAddVax = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await vaccinationsApi.create(Number(id), {
      ...vaxForm,
      next_due_date: vaxForm.next_due_date || null,
    });
    const all = await vaccinationsApi.list();
    setVaccinations(all.filter((v: Vaccination & { pet_id: number }) => v.pet_id === Number(id)));
    setShowVaxForm(false);
    setVaxForm({ vaccine_name: "", administered_date: "", next_due_date: "", lot_number: "" });
  };

  if (!pet) return <div data-testid="loading">Loading...</div>;

  return (
    <div data-testid="pet-detail-page">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2" data-testid="pet-detail-name">
          {pet.name}
        </h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Species:</span> <span data-testid="pet-species">{pet.species}</span></div>
          <div><span className="font-medium">Breed:</span> <span data-testid="pet-breed">{pet.breed}</span></div>
          <div><span className="font-medium">Birth Date:</span> <span data-testid="pet-birth-date">{pet.birth_date || "N/A"}</span></div>
          <div><span className="font-medium">Microchip:</span> <span data-testid="pet-microchip">{pet.microchip_id || "N/A"}</span></div>
        </div>
        {pet.notes && (
          <div className="mt-4" data-testid="pet-notes">
            <span className="font-medium">Notes:</span>
            <p className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: pet.notes }}></p>
          </div>
        )}
      </div>

      {/* Visits Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar size={20} /> Visits
          </h2>
          <button
            onClick={() => setShowVisitForm(!showVisitForm)}
            className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
            data-testid="add-visit-btn"
          >
            + Add Visit
          </button>
        </div>

        {showVisitForm && (
          <form onSubmit={handleAddVisit} className="mb-4 p-4 bg-gray-50 rounded-lg" data-testid="visit-form">
            <div className="grid grid-cols-2 gap-3">
              <input type="date" value={visitForm.visit_date} onChange={(e) => setVisitForm({ ...visitForm, visit_date: e.target.value })} className="border rounded p-2" data-testid="visit-date-input" required />
              <input type="text" placeholder="Reason" value={visitForm.reason} onChange={(e) => setVisitForm({ ...visitForm, reason: e.target.value })} className="border rounded p-2" data-testid="visit-reason-input" />
              <input type="text" placeholder="Diagnosis" value={visitForm.diagnosis} onChange={(e) => setVisitForm({ ...visitForm, diagnosis: e.target.value })} className="border rounded p-2" data-testid="visit-diagnosis-input" />
              <input type="text" placeholder="Treatment" value={visitForm.treatment} onChange={(e) => setVisitForm({ ...visitForm, treatment: e.target.value })} className="border rounded p-2" data-testid="visit-treatment-input" />
            </div>
            <button type="submit" className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" data-testid="visit-submit-btn">Save Visit</button>
          </form>
        )}

        {visits.length === 0 ? (
          <p className="text-gray-500" data-testid="no-visits">No visits recorded.</p>
        ) : (
          <ul className="space-y-2">
            {visits.map((visit) => (
              <li key={visit.id} className="border-b pb-2">
                <Link to={`/visits/${visit.id}`} className="text-indigo-600 hover:underline" data-testid={`visit-link-${visit.id}`}>
                  <FileText size={16} className="inline mr-1" />
                  {visit.visit_date} - {visit.reason || "General"}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Vaccinations Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Syringe size={20} /> Vaccinations
          </h2>
          <button
            onClick={() => setShowVaxForm(!showVaxForm)}
            className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
            data-testid="add-vax-btn"
          >
            + Add Vaccination
          </button>
        </div>

        {showVaxForm && (
          <form onSubmit={handleAddVax} className="mb-4 p-4 bg-gray-50 rounded-lg" data-testid="vax-form">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Vaccine Name" value={vaxForm.vaccine_name} onChange={(e) => setVaxForm({ ...vaxForm, vaccine_name: e.target.value })} className="border rounded p-2" data-testid="vax-name-input" required />
              <input type="date" value={vaxForm.administered_date} onChange={(e) => setVaxForm({ ...vaxForm, administered_date: e.target.value })} className="border rounded p-2" data-testid="vax-date-input" required />
              <input type="date" placeholder="Next Due" value={vaxForm.next_due_date} onChange={(e) => setVaxForm({ ...vaxForm, next_due_date: e.target.value })} className="border rounded p-2" data-testid="vax-next-date-input" />
              <input type="text" placeholder="Lot Number" value={vaxForm.lot_number} onChange={(e) => setVaxForm({ ...vaxForm, lot_number: e.target.value })} className="border rounded p-2" data-testid="vax-lot-input" />
            </div>
            <button type="submit" className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" data-testid="vax-submit-btn">Save Vaccination</button>
          </form>
        )}

        {vaccinations.length === 0 ? (
          <p className="text-gray-500" data-testid="no-vaccinations">No vaccinations recorded.</p>
        ) : (
          <ul className="space-y-2">
            {vaccinations.map((vax) => (
              <li key={vax.id} className="flex justify-between border-b pb-2" data-testid={`vax-item-${vax.id}`}>
                <span className="font-medium">{vax.vaccine_name}</span>
                <span className="text-gray-500 text-sm">{vax.administered_date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PetDetail;
