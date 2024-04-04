import { fetchMetrics } from "../api/get_metrics_service";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface ChartsProps {
  showDottedLine: boolean;
}

interface MetricsData {
  timestamp: string;
  value: number;
}
function Charts({ showDottedLine }: ChartsProps) {
  const [metricsData, setMetricsData] = useState<MetricsData[]>([]);
  const [average, setAverage] = useState<number>(0);

  useEffect(() => {
    const fetchMetricsData = async () => {
      try {
        const metrics = await fetchMetrics();
        setAverage(metrics.totalAgg.toFixed(2));

        const data: MetricsData[] = metrics.series.map(
          ([timestamp, value]: [number, number]) => {
            const date = new Date(timestamp * 1000);
            const formattedDate = date.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "2-digit",
            });
            return {
              timestamp: formattedDate,
              value,
            };
          }
        );

        setMetricsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMetricsData();
  }, []);

  return (
    <>
      <h3 className="chart-title">Metrics (Average): {average} ms</h3>
      <div className={showDottedLine ? "show-dotted-line" : ""}>
        <LineChart width={1800} height={500} data={metricsData}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <CartesianGrid stroke="#ee" strokeDasharray="5 5" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#C8E3F8"
            dot={{ fill: "#1C8BE3" }}
          />
        </LineChart>
      </div>
    </>
  );
}

export default Charts;
