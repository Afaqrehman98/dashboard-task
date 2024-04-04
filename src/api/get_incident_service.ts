import axios from "axios";
import { REACT_APP_DASHBOARD_TASK_API_KEY } from "../constants";

interface Service {
  id: number;
  name: string;
  status: string;
  description?: string;
}

export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await axios.get("https://api.ilert.com/api/incidents", {
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
