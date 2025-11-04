// src/components/admin/BackupsModal.jsx
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const BackupsModal = ({ backups, onClose, onRestore }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const formatTimestamp = (timestamp) => {
    // Input format: "2025-01-15T12-30-45-123Z"
    // Need to convert to: "2025-01-15T12:30:45.123Z"

    const parts = timestamp.split("T");
    if (parts.length === 2) {
      const datePart = parts[0]; // "2025-01-15"
      const timePart = parts[1]; // "12-30-45-123Z"

      // Replace hyphens with colons and dot in time part
      const timeFixed = timePart
        .replace("-", ":") // First hyphen → colon
        .replace("-", ":") // Second hyphen → colon
        .replace("-", "."); // Third hyphen → dot

      const isoString = `${datePart}T${timeFixed}`;
      const date = new Date(isoString);

      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }

    return "Invalid date";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/90 flex items-center justify-center z-[10000] p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white border border-black w-full max-w-2xl h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="border-b border-black p-6 flex justify-between items-center flex-shrink-0">
          <h2 className="text-[11px] uppercase tracking-wider">Backups</h2>
          <button onClick={onClose} className="text-xl hover:opacity-50">
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="overflow-y-scroll flex-1 p-6"
          style={{
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          {backups.length === 0 ? (
            <p className="text-center text-gray-300 py-8 text-[10px] uppercase tracking-wider">
              No backups yet
            </p>
          ) : (
            <div className="space-y-2">
              {backups.map((backup) => (
                <div
                  key={backup.name}
                  className="border border-black p-4 flex justify-between items-center text-[10px]"
                >
                  <div>
                    <div className="font-mono text-gray-600">{backup.name}</div>
                    <div className="mt-1 text-gray-400">
                      {formatTimestamp(backup.timestamp)}
                    </div>
                  </div>
                  <button
                    onClick={() => onRestore(backup.name)}
                    className="px-3 py-1 border border-black hover:bg-black hover:text-white transition-colors uppercase tracking-wider"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BackupsModal;
