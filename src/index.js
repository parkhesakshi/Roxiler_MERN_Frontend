import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Preloader from "./components/preloader/preloader";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppWithPreloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <App />
    </>
  );
};

root.render(
  <React.StrictMode>
    <AppWithPreloader />
  </React.StrictMode>
);
