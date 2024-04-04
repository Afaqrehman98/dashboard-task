import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import "../css/OpenAlert.css";
import React, { useEffect, useState } from "react";
import { countAlertsByStatus, fetchAlerts } from "../api/get_alerts_service";

interface StatusCounts {
  PENDING: number;
  ACCEPTED: number;
  RESOLVED: number;
}

interface OpenAlertProps {
  showDottedLine: boolean;
}

function OpenAlert({ showDottedLine }: OpenAlertProps) {
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    PENDING: 0,
    ACCEPTED: 0,
    RESOLVED: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alerts = await fetchAlerts();
        const counts: StatusCounts = countAlertsByStatus(alerts);
        setStatusCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="title mb-3">Open alerts</h3>
    <div className={`alertBox mb-5 ${showDottedLine ? "show-dotted-line" : ""}`}>
      {Object.entries(statusCounts).map(([status, count]) => (
        <div key={status}>
          <Card className="alert" variant="outlined">
            <Typography
              className="alertTitle"
              sx={{ fontSize: 14, fontWeight: "Bold", fontFamily: "Poppins, sans-serif" }}
              variant="h6"
              component="h1"
              gutterBottom
            >
              {status} Alerts
            </Typography>
            <Typography
              className="alertNumber"
              sx={{
                fontSize: 40,
                fontWeight: "Bold",
                fontFamily: "Poppins, sans-serif",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              gutterBottom
            >
              {count}
            </Typography>
          </Card>
        </div>
      ))}
    </div>
    </div>
  );
}

export default OpenAlert;
