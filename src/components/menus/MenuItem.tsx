import type { MenuItem as MenuItemType, DietaryCode } from "@/data/menus";

const dietaryLabels: Record<DietaryCode, string> = {
  v: "Vegetarian",
  ve: "Vegan",
  gf: "Gluten free",
};

const DietaryBadge = ({ code }: { code: DietaryCode }) => (
  <span
    className="inline-flex items-center rounded-sm border border-accent/40 px-1.5 py-0.5
               font-body text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-accent"
  >
    <span aria-hidden="true">{code}</span>
    <span className="sr-only">{dietaryLabels[code]}</span>
  </span>
);

export const MenuItem = ({ item }: { item: MenuItemType }) => (
  <li className="break-inside-avoid py-5">
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <h4 className="min-w-0 break-words font-display text-lg leading-tight tracking-[0.04em] text-fg">
        {item.name}
      </h4>
      {item.dietary?.length ? (
        <span className="flex shrink-0 gap-1">
          {item.dietary.map((code) => (
            <DietaryBadge key={code} code={code} />
          ))}
        </span>
      ) : null}
      {item.price ? (
        <>
          <span
            aria-hidden="true"
            className="hidden flex-1 border-b border-dotted border-line sm:block"
          />
          <span className="tabular ml-auto shrink-0 font-body text-base font-semibold text-fg sm:ml-0">
            {item.price}
          </span>
        </>
      ) : null}
    </div>

    {item.description ? (
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-fg-muted">
        {item.description}
      </p>
    ) : null}

    {item.recommendation ? (
      <p className="mt-2.5 inline-flex items-center rounded-sm bg-accent/10 px-2 py-1
                    font-body text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent">
        {item.recommendation}
      </p>
    ) : null}

    {item.options?.length ? (
      <ul className="mt-3 space-y-1.5">
        {item.options.map((option) => (
          <li
            key={option.label}
            className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm text-fg-muted"
          >
            <span className="min-w-0 break-words">{option.label}</span>
            {option.price ? (
              <>
                <span
                  aria-hidden="true"
                  className="hidden flex-1 border-b border-dotted border-line sm:block"
                />
                <span className="tabular ml-auto shrink-0 font-semibold text-fg sm:ml-0">
                  {option.price}
                </span>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    ) : null}
  </li>
);
