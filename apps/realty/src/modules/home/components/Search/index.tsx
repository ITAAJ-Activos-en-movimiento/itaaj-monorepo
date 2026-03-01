"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Search.module.css";
import { useRouter } from "next/navigation";

type Suggestion = {
  id: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
  fullText: string;
  displayType: string;
};

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  transactionSegment: string;
  propertySegment: string;
}

const toSlug = (value: string) => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

export default function Search({
  value,
  onChange,
  transactionSegment,
  propertySegment,
}: SearchProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  console.log({ suggestions });
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/maps/autocomplete?input=${encodeURIComponent(value.trim())}`
        );
        const data = await res.json();
        setSuggestions(data);
        setOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value]);

  const handleSelect = (s: Suggestion) => {
    onChange(s.fullText);
    setOpen(false);

    const parts = s.fullText.split(",").map((p) => p.trim());
    console.log({ parts });
    let neighborhoodName: string | undefined;
    let cityName: string | undefined;

    const display = s.displayType.toLowerCase();

    const isNeighborhood =
      display.includes("neighborhood") ||
      display.includes("district") ||
      display.includes("sublocality") ||
      display.includes("zona") ||
      display.includes("calle") ||
      display.includes("barrio");

    if (isNeighborhood) {
      // barrio = primer tramo, ciudad = segundo tramo
      neighborhoodName = parts[0]; // "Nueva España"
      cityName = parts[1] || parts[0]; // "Madrid"
    } else {
      // asumimos que es una ciudad
      cityName = parts[0]; // "Madrid"
    }

    const citySlug = cityName ? toSlug(cityName) : "ciudad";
    const zoneSlug = neighborhoodName
      ? toSlug(neighborhoodName)
      : "todas-las-zonas";

    // Aquí usamos el patrón de rutas que ya vienes trabajando:
    // /search/comprar/viviendas/{city}/{zone}/l
    router.push(
      `/${transactionSegment}/${propertySegment}/${citySlug}/${zoneSlug}/l`
    );
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Buscar vivienda en colonia, alcaldia..."
          className={styles.input}
          value={value}
          onChange={({ target }) => onChange(target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setOpen(true);
          }}
        />

        <button className={styles.searchBtn}>
          <svg viewBox="0 0 24 24">
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <line
              x1="17"
              y1="17"
              x2="22"
              y2="22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Buscar
        </button>
      </div>

      {open && suggestions.length > 0 && (
        <div className={styles.dropdown}>
          {suggestions.map((s) => (
            <div
              key={s.id}
              className={styles.item}
              onClick={() => handleSelect(s)}
            >
              <div>
                <p className={styles.itemTitle}>{s.mainText}</p>
                <p className={styles.itemSub}>{s.secondaryText}</p>
                <p className={styles.itemTag}>{s.displayType}</p>
              </div>
              {/* Aquí iría el número de inmuebles si luego lo añades */}
              {/* <span className={styles.count}>7.254</span> */}
            </div>
          ))}
        </div>
      )}

      {open && suggestions.length <= 0 && (
        <div className={styles.dropdown}>
          <div className={styles.item}>
            <img
              src="/images/home/search_by_commuting.png"
              alt=""
              className={styles.itemImg}
            />
            <div>
              <p className={styles.itemTitle}>Por Trayecto</p>
              <p className={styles.itemSub}>
                Tiempo de viaje a pie, bicicleta, coche o transporte público
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <img
              src="/images/home/search_by_draw.png"
              alt=""
              className={styles.itemImg}
            />
            <div>
              <p className={styles.itemTitle}>Por Mapa</p>
              <p className={styles.itemSub}>Dibuja tu zona de búsqueda</p>
            </div>
          </div>

          {/* <div className={styles.sectionTitle}>TUS BÚSQUEDAS RECIENTES</div> */}

          {/* <div className={styles.recentItem}>
                        <svg className={styles.clock} viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                            <line x1="12" y1="12" x2="12" y2="7" stroke="currentColor" strokeWidth="2" />
                            <line x1="12" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span>Comprar, España</span>
                    </div> */}

          {/* <div className={styles.recentItem}>
                        <svg className={styles.clock} viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                            <line x1="12" y1="12" x2="12" y2="7" stroke="currentColor" strokeWidth="2" />
                            <line x1="12" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
                        </svg>

                        <div className={styles.recentGroup}>
                            <span>Comprar, Hortaleza, Madrid Capital</span>
                            <p className={styles.recentSub}>desde 450.000 €</p>
                        </div>
                    </div> */}
        </div>
      )}
    </div>
  );
}
