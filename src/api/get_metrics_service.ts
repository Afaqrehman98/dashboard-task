import axios, { AxiosResponse } from "axios";
import { REACT_APP_DASHBOARD_TASK_API_KEY } from "../constants";

export const fetchMetrics = async () => {
  const url = `https://api.ilert.com/api/metrics/${38503}/series`;
  const params = {
    from: 1709684368,
    until: 1712362768,
    "interval-sec": 60,
    aggregation: "AVG",
    interpolate: true,
  };

  try {
    const response = await axios.get(url, {
      params: params,
      headers: {
        Authorization: `Bearer ${REACT_APP_DASHBOARD_TASK_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};
