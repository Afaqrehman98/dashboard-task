import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import OpenAlert from "./components/OpenAlert";
import RecentAlert from "./components/RecentAlert";
import ServiceStatus from "./components/ServiceStatus";
import OpenIncidents from "./components/OpenIncidents";
import Charts from "./components/Charts";

function App() {
  const [showDottedLine, setShowDottedLine] = useState(false);

  return (
    <React.StrictMode>
      <Header />
      <OpenAlert showDottedLine={showDottedLine} />
      <RecentAlert showDottedLine={showDottedLine}></RecentAlert>
      <ServiceStatus showDottedLine={showDottedLine} />
      <OpenIncidents showDottedLine={showDottedLine} />
      <Charts showDottedLine={showDottedLine} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
