import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { visitsApi } from "../services/visits.api";
import { ArrowLeft } from "lucide-react";

interface Visit {
  id: number;
  pet_id: number;
  vet_id: number | null;
  visit_date: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  attachment_path: string;
  created_at: string;
}

function VisitDetail() {
  const { id } = useParams<{ id: string }>();
  const [visit, setVisit] = useState<Visit | null>(null);

  useEffect(() => {
    if (id) {
      visitsApi.get(Number(id)).then(setVisit);
    }
  }, [id]);

  if (!visit) return <div data-testid="loading">Loading...</div>;

  return (
    <div data-testid="visit-detail-page">
      <Link
        to={`/pets/${visit.pet_id}`}
        className="flex items-center gap-1 text-indigo-600 hover:underline mb-4"
        data-testid="back-to-pet"
      >
        <ArrowLeft size={16} /> Back to Pet
      </Link>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4" data-testid="visit-title">
          Visit on {visit.visit_date}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-600">Reason</label>
            <p className="text-gray-800" data-testid="visit-reason">{visit.reason || "N/A"}</p>
          </div>
          <div>
            <label className="font-medium text-gray-600">Diagnosis</label>
            <p className="text-gray-800" data-testid="visit-diagnosis">{visit.diagnosis || "N/A"}</p>
          </div>
          <div>
            <label className="font-medium text-gray-600">Treatment</label>
            <p className="text-gray-800" data-testid="visit-treatment">{visit.treatment || "N/A"}</p>
          </div>
          <div>
            <label className="font-medium text-gray-600">Attachment</label>
            <p className="text-gray-800" data-testid="visit-attachment">
              {visit.attachment_path || "None"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitDetail;
