// src/AdminPanel.jsx
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ItemGrid from "./components/admin/ItemGrid";
import BackupsModal from "./components/admin/BackupsModal";
import FormModal from "./components/admin/FormModal";
import Login from "./components/admin/Login";
import { useLenis } from "lenis/react";
import SiloHoverButton from "./components/SiloHoverButton.jsx";

const API_URL =
  import.meta.env.VITE_ADMIN_API_URL ||
  "https://exu-admin-server.onrender.com/api";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("exhibitions");
  const [data, setData] = useState({
    selectedWorks: [],
    videos: [],
    exhibitions: [],
  });
  const [backups, setBackups] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showBackups, setShowBackups] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = sessionStorage.getItem("adminAuth");
    const token = sessionStorage.getItem("adminToken");

    if (authStatus === "true" && token) {
      setIsAuthenticated(true);
      loadData();
      loadBackups();
    } else {
      setLoading(false);
    }
  }, []);

  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }

    return () => {
      if (lenis) lenis.start();
    };
  }, [lenis]);

  const handleLogin = () => {
    sessionStorage.setItem("adminAuth", "true");
    setIsAuthenticated(true);
    loadData();
    loadBackups();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/data`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401 || response.status === 403) {
        console.error("Authentication failed");
        handleLogout();
        return;
      }

      const result = await response.json();
      console.log("Loaded data:", result);
      setData(result);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load data. Make sure the admin server is running.");
    } finally {
      setLoading(false);
    }
  };

  const loadBackups = async () => {
    try {
      const response = await fetch(`${API_URL}/backups`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401 || response.status === 403) {
        console.error("Authentication failed");
        return;
      }

      const result = await response.json();
      setBackups(result);
    } catch (error) {
      console.error("Error loading backups:", error);
    }
  };

  const saveData = async (newData) => {
    try {
      setSaveStatus("Saving...");
      console.log("Sending to backend:", newData);

      const response = await fetch(`${API_URL}/data`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newData),
      });

      if (response.status === 401 || response.status === 403) {
        console.error("Authentication failed");
        handleLogout();
        return;
      }

      const result = await response.json();
      console.log("Backend response:", result);

      if (result.success) {
        setData(newData);
        setSaveStatus("Saved ✓");
        loadBackups();
        setTimeout(() => setSaveStatus(""), 2000);
      } else {
        console.error("Save failed:", result);
        setSaveStatus("Error ✗");
        alert("Failed to save: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setSaveStatus("Error ✗");
      alert("Failed to save data. Make sure the admin server is running.");
    }
  };

  const handleRestore = async (backupName) => {
    if (!confirm(`Restore from backup: ${backupName}?`)) return;

    try {
      const response = await fetch(`${API_URL}/restore`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ backupName }),
      });

      if (response.status === 401 || response.status === 403) {
        console.error("Authentication failed");
        handleLogout();
        return;
      }

      const result = await response.json();

      if (result.success) {
        await loadData();
        await loadBackups();
        alert("Restored successfully!");
        setShowBackups(false);
      }
    } catch (error) {
      console.error("Error restoring backup:", error);
      alert("Failed to restore backup.");
    }
  };

  const handleDelete = (type, id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const newData = { ...data };
    const key =
      type === "exhibitions"
        ? "exhibitions"
        : type === "works"
          ? "selectedWorks"
          : "videos";
    newData[key] = newData[key].filter((item) => item.id !== id);
    saveData(newData);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleAdd = () => {
    const emptyItem = {
      title: "",
      year: "",
      description: "",
      material: "",
      dimensions: "",
      category: "",
      location: "",
      date: "",
      url: "",
      videoUrl: "",
      safeTitle: "",
      duration: "",
      media: [],
      images: [],
      header: "",
      textContent: "",
      workIncluded: [],
    };
    setEditingItem(emptyItem);
    setShowForm(true);
  };

  const handleSave = (item) => {
    console.log("onSave called with item:", item);

    const newData = { ...data };
    const key = activeTab === "works" ? "selectedWorks" : activeTab;

    if (editingItem && editingItem.id) {
      console.log("Editing existing item with id:", editingItem.id);
      const index = newData[key].findIndex((i) => i.id === item.id);
      if (index !== -1) {
        newData[key][index] = item;
        console.log("Updated item at index:", index);
      }
    } else {
      item.id = Date.now().toString();
      console.log("Adding new item with id:", item.id);
      newData[key].push(item);
      console.log("New data array:", newData[key]);
    }

    console.log("Saving data to backend...");
    saveData(newData);
    setShowForm(false);
    setEditingItem(null);
  };

  const tabs = [
    { id: "exhibitions", label: "EXHIBITIONS" },
    { id: "works", label: "WORKS" },
    { id: "videos", label: "VIDEOS" },
  ];

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/97 z-[9999] flex items-center justify-center">
        <div className="text-center text-xs">
          <div className="mb-2 text-[10px] uppercase tracking-wider">
            Loading...
          </div>
          <code className="text-[9px] text-gray-400">node admin-server.js</code>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white/90 z-[9999] font-sans overflow-y-auto">
      {/* Combined Header: Admin Panel + Tabs + Actions */}
      <div className="fixed top-8 left-6 right-6 z-[10002]">
        <div className="relative flex items-center justify-center mb-8">
          {/* Left: Admin Panel Title (absolute positioned) */}
          <div className="absolute left-0 text-[12px] lowercase tracking-wider">
            Admin Panel
          </div>

          {/* Center: Tabs (naturally centered) */}
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[12px] w-[4rem] lowercase tracking-wider transition-opacity ${
                  activeTab === tab.id ? "opacity-100" : "opacity-30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right: Save Status, Backups, and Logout (absolute positioned) */}
          <div className="absolute right-0 flex items-center gap-4">
            {saveStatus && (
              <span className="text-[12px] text-gray-400">{saveStatus}</span>
            )}
            <button
              onClick={() => setShowBackups(true)}
              className="text-[12px] lowercase tracking-wider text-gray-400 hover:text-black transition-colors"
            >
              Backups ({backups.length})
            </button>
            <button
              onClick={handleLogout}
              className="text-[10px] lowercase tracking-wider text-gray-400 hover:text-black transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content - Centered */}
      <div className="flex justify-center items-start min-h-[48vh] px-8 pt-24">
        <div className="w-full max-w-[12rem]">
          <ItemGrid
            items={data[activeTab === "works" ? "selectedWorks" : activeTab]}
            type={activeTab}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Add New Capsule Button - Centered Bottom */}
      <div className="flex justify-center pt-8 pb-16">
        {/*<button*/}
        {/*  onClick={handleAdd}*/}
        {/*  className="px-[5px] py-[1px] rounded-full border-black text-[10px] lowercase tracking-wider bg-black bg-opacity-10 hover:bg-black hover:text-white transition-colors"*/}
        {/*>*/}
        {/*  +*/}
        {/*</button>*/}
        <SiloHoverButton label="+" speed={300} onClick={handleAdd} />
      </div>

      <AnimatePresence>
        {showForm && (
          <FormModal
            type={activeTab}
            item={editingItem}
            onClose={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            onSave={handleSave}
          />
        )}
        {showBackups && (
          <BackupsModal
            backups={backups}
            onClose={() => setShowBackups(false)}
            onRestore={handleRestore}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
