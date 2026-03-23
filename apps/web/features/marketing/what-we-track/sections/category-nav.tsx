import { cn } from "@/lib/utils";
import { CATEGORY_CONFIG, CATEGORY_ORDER, BIOMARKERS } from "../data";
import { CornerCrosses } from "@/components/decorations/corner-cross";

interface CategoryNavProps {
  activeCategory: string;
  onCategoryClick: (category: string) => void;
  visibleCategories?: string[];
  variant: "sidebar" | "pills";
}

function getCategoryCount(category: string) {
  return BIOMARKERS.filter((b) => b.category === category).length;
}

export function CategoryNav({
  activeCategory,
  onCategoryClick,
  visibleCategories,
  variant,
}: CategoryNavProps) {
  const categories = visibleCategories
    ? CATEGORY_ORDER.filter((c) => visibleCategories.includes(c))
    : CATEGORY_ORDER;

  if (variant === "pills") {
    return (
      <nav className="sticky top-16 z-40 -mx-6 px-6 py-3 border-b border-neutral-200 bg-neutral-50 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1 min-w-max">
          {categories.map((cat) => {
            const config = CATEGORY_CONFIG[cat];
            if (!config) return null;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryClick(cat)}
                className={cn(
                  "shrink-0 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.06em] transition-all cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100",
                )}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Sidebar variant
  return (
    <nav className="sticky top-20 self-start border border-neutral-200 bg-white">
      {categories.map((cat) => {
        const config = CATEGORY_CONFIG[cat];
        if (!config) return null;
        const isActive = activeCategory === cat;
        const Icon = config.icon;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryClick(cat)}
            className={cn(
              "relative group flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors cursor-pointer border-b border-neutral-100 last:border-b-0",
              isActive ? "bg-neutral-50" : "hover:bg-neutral-50/50",
            )}
          >
            {isActive && <CornerCrosses />}
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center transition-colors",
                isActive
                  ? "bg-accent-500 text-white"
                  : "bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200 group-hover:text-neutral-500",
              )}
            >
              <Icon className="size-3.5" />
            </span>
            <span
              className={cn(
                "font-mono text-[11px] font-bold uppercase tracking-[0.04em] transition-colors",
                isActive
                  ? "text-neutral-900"
                  : "text-neutral-400 group-hover:text-neutral-600",
              )}
            >
              {config.label}
            </span>
            <span
              className={cn(
                "ml-auto font-mono text-[10px] tabular-nums transition-colors",
                isActive ? "text-neutral-500" : "text-neutral-300",
              )}
            >
              {getCategoryCount(cat)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
