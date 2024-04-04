import "../css/RecentAlert.css";
import { fetchRecentAlertActivity } from "../api/get_alert_activity";
import { useEffect, useState } from "react";
import moment from "moment";

interface RecentAlertProps {
  showDottedLine: boolean;
}

function RecentAlert({ showDottedLine }: RecentAlertProps) {
  const [logEntries, setLogEntries] = useState<any[]>([]);

  useEffect(() => {
    const fetchAlertActivity = async () => {
      try {
        const data = await fetchRecentAlertActivity();
        console.log("Data:", data);
        setLogEntries(data);
      } catch (error) {
        console.error("Error fetching alert activity:", error);
      }
    };

    fetchAlertActivity();
  }, []);

  return (
    <>
      <h3 className="recent-title mb-3">Recent alert activity</h3>
      <table className={showDottedLine ? "show-dotted-line" : "mb-5"}>
        <thead>
          <tr>
            <th className="left-align">Alert Source</th>
            <th className="left-align">Alert</th>
            <th className="left-align">Time</th>
            <th className="left-align">Activity</th>
          </tr>
        </thead>
        <tbody>
          {logEntries.map((entry, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "gray-row" : "white-row"}
            >
              <td className="source-row">
                {entry.alert?.alertSource.iconUrl && (
                  <img
                    src={entry.alert?.alertSource.iconUrl}
                    alt="Alert Icon"
                  />
                )}
                {entry.alert?.alertSource?.name || "N/A"}
              </td>
              <td className="alert-row">{entry.alert?.summary || "N/A"}</td>
              <td className="time-row">
                {moment(entry.alert.reportTime).fromNow()}
              </td>
              <td className="activity-row">{entry.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default RecentAlert;
