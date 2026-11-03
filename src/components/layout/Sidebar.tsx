import React from 'react';

export interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  statusFilter: string;
  onSelectStatus: (status: string) => void;
  categories: { id: string; label: string }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  statusFilter,
  onSelectStatus,
  categories,
}) => {
  return (
    <aside
      aria-label="Navigation Sidebar"
      className="w-full md:w-sidebar bg-brand-card border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6 shrink-0"
    >
      <div className="flex flex-col gap-4">
        <div className="text-base font-bold text-brand-text hidden md:block">
          Categories
        </div>

        <nav
          aria-label="Categories"
          className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-2 rounded-brand text-sm font-medium transition-colors text-left whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'text-brand-muted hover:bg-gray-100 hover:text-brand-text'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        <div className="pt-2 md:pt-4 border-t border-gray-200">
          <div className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
            Status
          </div>
          <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'in-stock', label: 'In Stock' },
              { id: 'out-of-stock', label: 'Out of Stock' },
            ].map((status) => {
              const isSelected = statusFilter === status.id;
              return (
                <button
                  key={status.id}
                  type="button"
                  onClick={() => onSelectStatus(status.id)}
                  className={`px-3 py-1.5 rounded-brand text-xs font-medium transition-colors text-left whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary ${
                    isSelected
                      ? 'bg-primary text-white'
                      : 'text-brand-muted hover:bg-gray-100 hover:text-brand-text'
                  }`}
                >
                  {status.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
