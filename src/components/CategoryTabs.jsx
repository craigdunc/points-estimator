import React, { useRef, useEffect } from 'react';

/**
 * CategoryTabs
 * Props:
 * - categories: [{ key: string, label: string }]
 * - activeCategory: string
 * - onCategoryChange: (key: string) => void
 */
export default function CategoryTabs({ categories, activeCategory, onCategoryChange }) {
  const tabsRef = useRef(null);

  // Center the active tab on mount & when activeCategory changes
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-key="${activeCategory}"]`);
    if (!btn) return;

    btn.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }, [activeCategory]);

  return (
    <div>
      <div className="w-full overflow-x-auto no-scrollbar" ref={tabsRef}>
        <div className="inline-flex px-4 space-x-4 whitespace-nowrap">
          {categories.map(cat => (
            <button
              key={cat.key}
              data-key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              className={`text-[12px] whitespace-nowrap pb-3 ${activeCategory === cat.key
                ? 'text-red-600 border-b-2 border-red-600 font-medium'
                : 'text-gray-800 font-normal'
                }`}
            >
              {cat.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
