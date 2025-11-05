// src/components/NavigationUtility.jsx
import { useData } from "../context/DataContext";
import { slugify } from "../helpers/slugify";
import { useMemo } from "react";

// Utility function that accepts data as parameter
export function getAdjacentItemsFromData(data, currentPath) {
  const allItems = [
    ...data.exhibitions.map((e) => ({ ...e, type: "exhibition" })),
    ...data.selectedWorks.map((p) => ({ ...p, type: "project" })),
  ];

  const [, currentType, currentSlug] = currentPath.split("/");
  const currentIndex = allItems.findIndex(
    (item) => item.type === currentType && slugify(item.title) === currentSlug,
  );

  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next =
    currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return {
    prev: prev ? { slug: slugify(prev.title), type: prev.type } : null,
    next: next ? { slug: slugify(next.title), type: next.type } : null,
  };
}

// Hook version that uses context
export function useAdjacentItems(currentPath) {
  const { data } = useData();

  return useMemo(() => {
    return getAdjacentItemsFromData(data, currentPath);
  }, [data, currentPath]);
}

// Backwards compatible default export
export function getAdjacentItems(currentPath) {
  // This version requires data to be passed from context
  // It's kept for backwards compatibility but components should use the hook instead
  console.warn(
    "getAdjacentItems requires data context. Use useAdjacentItems hook instead.",
  );
  return { prev: null, next: null };
}
