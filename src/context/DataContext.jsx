// src/context/DataContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

const API_URL =
  import.meta.env.VITE_API_URL || "https://exu-admin-server.onrender.com/api";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    selectedWorks: [],
    videos: [],
    exhibitions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log("📥 Fetching data from:", `${API_URL}/public/data`);

      const response = await fetch(`${API_URL}/public/data`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Data loaded:", result);

      setData({
        selectedWorks: result.selectedWorks || [],
        videos: result.videos || [],
        exhibitions: result.exhibitions || [],
      });
      setError(null);
    } catch (error) {
      console.error("❌ Error loading data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    data,
    loading,
    error,
    reload: loadData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
