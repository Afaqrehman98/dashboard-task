import axios from "axios";
import { REACT_APP_DASHBOARD_TASK_API_KEY } from "../constants";

interface Alert {
  id: number;
  summary: string;
  details: string;
  status: "PENDING" | "ACCEPTED" | "RESOLVED";
}

export const fetchAlerts = async (): Promise<Alert[]> => {
  try {
    const response = await axios.get("https://api.ilert.com/api/alerts", {
      headers: {
        Authorization: `Bearer ${REACT_APP_DASHBOARD_TASK_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
};

export const countAlertsByStatus = (alerts: Alert[]) => {
  const counts = alerts.reduce(
    (acc, alert) => {
      acc[alert.status]++;
      return acc;
    },
    {
      PENDING: 0,
      ACCEPTED: 0,
      RESOLVED: 0,
    }
  );

  return counts;
};

type StatusCounts = {
  [key in "PENDING" | "ACCEPTED" | "RESOLVED"]: number;
};

export const countAlertsByStatusTyped = async (): Promise<StatusCounts> => {
  try {
    const alerts = await fetchAlerts();
    const counts = countAlertsByStatus(alerts);
    return counts;
  } catch (error) {
    console.error("Error counting alerts by status:", error);
    return {
      PENDING: 0,
      ACCEPTED: 0,
      RESOLVED: 0,
    };
  }
};
