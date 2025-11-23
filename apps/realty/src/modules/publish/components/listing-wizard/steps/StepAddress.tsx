"use client";

import { useState } from "react";
import styles from "./StepAddress.module.css";
import { PublishFormData } from "@/app/(publish)/publish/page";
import Map from "../../Map";

interface StepAddressProps {
  value: PublishFormData;
  onChange: (partial: Partial<PublishFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepAddress: React.FC<StepAddressProps> = ({
  value,
  onChange,
  onNext,
  onBack,
}) => {
  const [isLocated, setIsLocated] = useState<boolean>(
    !!(value.lat && value.lng)
  );
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleLocate = async () => {
    if (!value.street || !value.streetNumber) return;

    setIsLocating(true);
    setError(null);

    try {
      const fullAddress = `${value.streetNumber} ${value.street}${
        value.city ? `, ${value.city}` : ""
      }`;

      const res = await fetch("/api/maps/geocode", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ address: fullAddress }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError("No hemos podido localizar esta dirección.");
        return;
      }

      onChange({ lat: data.lat, lng: data.lng });
      setIsLocated(true);
    } catch (e) {
      console.error(e);
      setError("Error al localizar la dirección.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleNext = () => {
    // Podrías validar city / street / number
    onNext();
  };

  const handleMapPositionChange = (lat: number, lng: number) => {
    onChange({ lat, lng });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Dirección del inmueble</h2>
      {isLocated && (
        <>
          <div className={styles.mapPlaceholder}>
            <Map
              lat={value.lat || 0}
              lng={value.lng || 0}
              onPositionChange={handleMapPositionChange}
            />
          </div>

          <div className={styles.switchRow}>
            <label className={styles.switchLabel}>
              <input
                type="checkbox"
                checked={!!value.hideExactAddress}
                onChange={(e) =>
                  onChange({ hideExactAddress: e.target.checked })
                }
              />
              Ocultar dirección exacta (costo adicional)
            </label>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Orientación</label>
            <select
              className={styles.select}
              value={value.orientation ?? ""}
              onChange={(e) =>
                onChange({ orientation: e.target.value || null })
              }
            >
              <option value="">Selecciona</option>
              <option value="N">Norte</option>
              <option value="S">Sur</option>
              <option value="E">Este</option>
              <option value="W">Oeste</option>
            </select>
          </div>
        </>
      )}
      <>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Ciudad</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Ej. Guadalajara"
            value={value.city ?? ""}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </div>

        <div className={styles.inlineGroup}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Calle *</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Ej. Calle Alcalá"
              value={value.street ?? ""}
              onChange={(e) => onChange({ street: e.target.value })}
            />
          </div>

          <div className={styles.fieldGroupSmall}>
            <label className={styles.label}>Número *</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Ej. 150"
              value={value.streetNumber ?? ""}
              onChange={(e) => onChange({ streetNumber: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.actionsRow}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onBack}
          >
            Atrás
          </button>

          <div className={styles.rightActions}>
            <button
              type="button"
              className={styles.primaryButtonSoft}
              onClick={handleLocate}
              disabled={!value.street || !value.streetNumber}
            >
              Localizar
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleNext}
              disabled={!value.street || !value.streetNumber}
            >
              Siguiente
            </button>
          </div>
        </div>
      </>
    </div>
  );
};
