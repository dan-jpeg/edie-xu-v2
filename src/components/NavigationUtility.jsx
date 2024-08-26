// navigation.js
import { exhibitions2, selectedWorks } from "../data/projects-and-videos";
import { slugify } from "../helpers/slugify";

const allItems = [
  ...exhibitions2.map((e) => ({ ...e, type: "exhibition" })),
  ...selectedWorks.map((p) => ({ ...p, type: "project" })),
];

export function getAdjacentItems(currentPath) {
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
