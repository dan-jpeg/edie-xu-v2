// src/components/admin/ItemGrid.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ItemGrid = ({ items, type, onEdit, onDelete }) => {
  const [selectedId, setSelectedId] = useState(null);

  // Determine alignment based on type
  const getAlignment = () => {
    if (type === "exhibitions") return "text-left";
    if (type === "works") return "text-center";
    if (type === "videos") return "text-right";
    return "text-center";
  };

  const getJustify = () => {
    if (type === "exhibitions") return "justify-start transform -translate-x-5";
    if (type === "works") return "justify-center";
    if (type === "videos") return "justify-end";
    return "justify-center";
  };

  const getOffset = () => {
    if (type === "videos") return "transform translate-x-22";
    return "transform translate-x-0";
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-300  text-[10px] uppercase tracking-wider">
        No items yet
      </div>
    );
  }

  const handleItemClick = (e, itemId) => {
    // Don't toggle if clicking on edit/delete buttons
    if (e.target.closest("button")) return;

    setSelectedId(itemId === selectedId ? null : itemId);
  };

  const alignment = getAlignment();
  const justify = getJustify();
  const offset = getOffset();

  return (
    <div
      key={type}
      className={`space-y-0 mt-24 flex flex-col ${justify}`}
      onClick={(e) => {
        // Click outside items to deselect
        if (e.target === e.currentTarget) {
          setSelectedId(null);
        }
      }}
    >
      {items.map((item) => {
        const isSelected = selectedId === item.id;
        const hasSelection = selectedId !== null;
        const shouldDim = hasSelection && !isSelected;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldDim ? 0.6 : 1 }}
            transition={{ duration: 0.2 }}
            className={`${alignment} group relative cursor-pointer`}
            onClick={(e) => handleItemClick(e, item.id)}
          >
            <div className="mt-0">
              <h3
                className={`text-[12px] uppercase font-alte-haas mb-1 transition-all ${
                  isSelected ? "font-bold" : "group-hover:font-bold"
                }`}
              >
                {item.title}
              </h3>
            </div>

            {/* Hover Actions - Right Side with Layout Animation */}
            <AnimatePresence>
              {(isSelected || (!hasSelection && true)) && (
                <motion.div
                  layoutId="action-buttons"
                  className={`absolute -right-16 top-0 flex gap-3 ${
                    isSelected
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  initial={isSelected ? false : { opacity: 0 }}
                  animate={{
                    opacity: isSelected ? 1 : 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <button
                    onClick={() => onEdit(item)}
                    className="text-gray-400 hover:text-black transition-colors"
                    title="Edit"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(type, item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ItemGrid;
