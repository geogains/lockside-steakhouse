import type { MenuSection } from "@/data/menus";
import { MenuItem } from "./MenuItem";
import { Reveal } from "@/components/shared/Reveal";

export const MenuCategory = ({ section }: { section: MenuSection }) => {
  if (section.items.length === 0) return null;

  return (
    <Reveal>
      <header className="border-b-2 border-accent/30 pb-4">
        <h3 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-none text-fg">
          {section.title}
        </h3>
        {section.description ? (
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-fg-muted">
            {section.description}
          </p>
        ) : null}
      </header>

      {section.note ? (
        <p className="mt-4 rounded-card border border-line bg-bg-elevated p-4 text-sm leading-relaxed text-fg-muted">
          {section.note}
        </p>
      ) : null}

      <ul className="divide-y divide-line">
        {section.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </Reveal>
  );
};
