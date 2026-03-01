"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";

type Option = {
  label: string;
  slug: string;
};

interface CustomSelectProps {
  value: string;
  onChange: (slug: string) => void;
}

const options: Option[] = [
  { label: "Vivienda", slug: "viviendas" },
  { label: "Obra nueva", slug: "obra-nueva" },
  { label: "Local y nave", slug: "local-y-nave" },
  { label: "Garaje", slug: "garajes" },
  { label: "Oficina", slug: "oficinas" },
  { label: "Terreno", slug: "terrenos" },
  { label: "Edificio", slug: "edificios" },
];

export default function CustomSelect({ value, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.slug === value) ?? options[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={styles.trigger}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls="custom-select-content"
        onClick={() => setOpen(!open)}
      >
        {selected.label}

        <svg
          className={`${styles.icon} ${open ? styles.iconOpen : ""}`}
          viewBox="0 0 24 24"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          id="custom-select-content"
          role="listbox"
          className={styles.dropdown}
        >
          <p className={styles.label}>Seleccione una tipología</p>

          {options.map((opt) => (
            <div
              key={opt.slug}
              role="option"
              aria-selected={value === opt.slug}
              className={`${styles.option} ${
                value === opt.slug ? styles.optionSelected : ""
              }`}
              onClick={() => {
                onChange(opt.slug);
                setOpen(false);
              }}
            >
              {opt.label}

              {value === opt.slug && (
                <svg className={styles.check} viewBox="0 0 24 24">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
