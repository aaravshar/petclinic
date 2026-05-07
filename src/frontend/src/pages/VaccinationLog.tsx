import { useEffect, useState } from "react";
import { vaccinationsApi } from "../services/vaccinations.api";
import { Syringe } from "lucide-react";

interface Vaccination {
  id: number;
  pet_id: number;
  vaccine_name: string;
  administered_date: string;
  next_due_date: string | null;
  lot_number: string;
}

function VaccinationLog() {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  useEffect(() => {
    vaccinationsApi.list().then(setVaccinations);
  }, []);

  return (
    <div data-testid="vaccination-log-page">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2" data-testid="vax-log-title">
        <Syringe size={28} /> Vaccination Log
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full" data-testid="vax-table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Vaccine</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Pet ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Administered</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Next Due</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Lot #</th>
            </tr>
          </thead>
          <tbody>
            {vaccinations.map((vax) => (
              <tr key={vax.id} className="border-t" data-testid={`vax-row-${vax.id}`}>
                <td className="px-4 py-3" data-testid={`vax-name-${vax.id}`}>{vax.vaccine_name}</td>
                <td className="px-4 py-3">{vax.pet_id}</td>
                <td className="px-4 py-3">{vax.administered_date}</td>
                <td className="px-4 py-3">{vax.next_due_date || "N/A"}</td>
                <td className="px-4 py-3">{vax.lot_number || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {vaccinations.length === 0 && (
          <p className="text-center text-gray-500 py-8" data-testid="no-vax-message">
            No vaccinations recorded yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default VaccinationLog;
