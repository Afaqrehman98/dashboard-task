import { REACT_APP_DASHBOARD_TASK_API_KEY } from "../constants";
import axios from "axios";

interface Alert {
  id: number;
  summary: string;
  details: string;
  alertSource: AlertSource;
  iconUrl: string;
}

interface AlertSource {
  id: number;
  name: string;
  integrationType: string;
  iconUrl: string;
}

interface LogEntry {
  id: number;
  timestamp: string;
  text: string;
  alertId: number;
  alert: Alert;
}

interface LogEntryResponse {
  id: number;
  timestamp: string;
  text: string;
  alertId: number;
  alert: Alert;
  alertSource: AlertSource;
}

const API_URL =
  "https://api.ilert.com/api/alerts/newest-log-entries?include=alert&include=vars&include=textPlain";

export const fetchRecentAlertActivity = async (): Promise<LogEntry[]> => {
  try {
    const response = await axios.get<LogEntryResponse[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${REACT_APP_DASHBOARD_TASK_API_KEY}`,
      },
    });

    console.log(response.data);

    const logEntries: LogEntry[] = response.data.map((entry) => ({
      id: entry.id,
      timestamp: entry.timestamp,
      text: entry.text,
      alertId: entry.alertId,
      alert: {
        id: entry.alert?.id,
        summary: entry.alert?.summary,
        details: entry.alert?.details,
        alertSource: entry.alert.alertSource,
        iconUrl: entry.alert.alertSource.iconUrl,
      },
    }));

    return logEntries;
  } catch (error) {
    console.error("Error fetching log entries:", error);
    return [];
  }
};
