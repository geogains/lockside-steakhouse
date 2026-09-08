import { FileDown } from "lucide-react";

type MenuPdfLinkProps = {
  href: string;
  label: string;
};

export const MenuPdfLink = ({ href, label }: MenuPdfLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase
               tracking-[0.16em] text-accent transition-colors hover:text-fg no-print"
  >
    <FileDown className="h-4 w-4" aria-hidden="true" />
    {label}
  </a>
);
