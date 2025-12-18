"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type OrderKey =
  | "score"
  | "recent"
  | "price_asc"
  | "price_desc"
  | "area_desc"
  | "area_asc"
  | "ppm2_asc";

const OPTIONS: { value: OrderKey; label: string }[] = [
  { value: "score", label: "Puntuación Itaaj" },
  { value: "recent", label: "Más recientes" },
  { value: "price_asc", label: "Más baratos" },
  { value: "price_desc", label: "Más caros" },
  { value: "area_desc", label: "Más grandes" },
  { value: "area_asc", label: "Más pequeños" },
  { value: "ppm2_asc", label: "Más baratos $/m2" },
];

export function OrderSelect({ styles }: { styles: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const current = (sp.get("order") as OrderKey) || "score";

  return (
    <select
      className={styles.select}
      value={current}
      onChange={(e) => {
        const next = new URLSearchParams(sp.toString());
        next.set("order", e.target.value);
        next.set("page", "1"); // importantísimo: si cambias el orden, vuelves a página 1
        router.push(`${pathname}?${next.toString()}`);
      }}
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
