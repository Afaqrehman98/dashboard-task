import { Button, Card } from "@mui/material";
import "../css/OpenIncidents.css";
import { fetchServices } from "../api/get_incident_service";
import { useEffect, useState } from "react";
import moment from "moment";

interface AffectedService {
  service: {
    id: number;
    name: string;
    status: string;
    description?: string;
  };
  impact: string;
}

interface OpenIncidentProps {
  showDottedLine: boolean;
}

function OpenIncidents({ showDottedLine }: OpenIncidentProps) {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const statusIcons: { [key: string]: JSX.Element } = {
    PARTIAL_OUTAGE: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="Partial-outage"
        focusable="false"
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
        aria-label="Partial-outage"
      >
        <path d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"></path>
      </svg>
    ),
    DEGRADED: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="Degraded"
        focusable="false"
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
        aria-label="Degraded"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
      </svg>
    ),
    UNDER_MAINTENANCE: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="Under-maintenance"
        focusable="false"
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
        aria-label="Under-maintenance"
      >
        <path
          fill-rule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.54 13.85-.69.69c-.39.39-1.02.39-1.41 0l-3.05-3.05c-1.22.43-2.64.17-3.62-.81-1.11-1.11-1.3-2.79-.59-4.1l2.35 2.35 1.41-1.41-2.36-2.35c1.32-.71 2.99-.52 4.1.59.98.98 1.24 2.4.81 3.62l3.05 3.05c.39.39.39 1.03 0 1.42z"
        ></path>
      </svg>
    ),
    MAJOR_OUTAGE: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="Major-outage"
        focusable="false"
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
        aria-label="Major-outage"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"></path>
      </svg>
    ),
    OPERATIONAL: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="Operational"
        focusable="false"
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
        aria-label="Operational"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29 5.7 12.7a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"></path>
      </svg>
    ),
  };

  return (
    <>
      <h3 className="open-incidents mb-3">Open incidents</h3>
      <div className={showDottedLine ? "show-dotted-line" : "mb-5"}>
        {services.map((incident) => (
          <Card key={incident.id}>
            <div className="card">
              <div className="flex-container mb-2">
                <h4 className="card-title">{incident.summary}</h4>
                <h5 className="card-status">{incident.status}</h5>

                <button className="btn-update" type="button">
                  Update
                </button>
              </div>
              <p className="card-desc">
                {moment(incident.updatedAt).fromNow()} - {incident.message}
              </p>
              <div className="blue-text-container">
                {incident.affectedServices.map(
                  (affectedService: AffectedService) => (
                    <div
                      key={affectedService.service.id}
                      className="blue-text-item"
                    >
                      {statusIcons[affectedService.service.status]}
                      <span>{affectedService.service.name}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
export default OpenIncidents;
