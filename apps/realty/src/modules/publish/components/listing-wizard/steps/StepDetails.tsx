"use client";

import { PublishFormData } from "@/app/(publish)/publish/page";
import styles from "./StepDetails.module.css";

interface StepDetailsProps {
  value: PublishFormData;
  onChange: (partial: Partial<PublishFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const INTERIOR_EXTRAS = [
  "Aire acondicionado",
  "Amueblado",
  "Armarios empotrados",
  "Calefacción",
  "Electrodomésticos",
  "Lavadero",
  "Parquet",
  "Suite con baño",
];

const EXTERIOR_EXTRAS = [
  "Balcón",
  "Terraza",
  "Jardín",
  "Piscina",
  "Garaje",
  "Trastero",
  "Zona infantil",
  "Zonas verdes",
];

export const StepDetails: React.FC<StepDetailsProps> = ({
  value,
  onChange,
  onNext,
  onBack,
}) => {
  const toggleInteriorExtra = (extra: string) => {
    const current = value.interiorExtras;
    const exists = current.includes(extra);
    const next = exists
      ? current.filter((e) => e !== extra)
      : [...current, extra];
    onChange({ interiorExtras: next });
  };

  const toggleExteriorExtra = (extra: string) => {
    const current = value.exteriorExtras;
    const exists = current.includes(extra);
    const next = exists
      ? current.filter((e) => e !== extra)
      : [...current, extra];
    onChange({ exteriorExtras: next });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Describe los detalles de tu anuncio</h2>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Descripción</label>
        <textarea
          className={styles.textarea}
          rows={6}
          placeholder="La gente valora información que no aparece en las fotos, como la luminosidad, altura de la vivienda o servicios de la zona..."
          value={value.description ?? ""}
          onChange={(e) => onChange({ description: e.target.value })}
        />
        <span className={styles.helper}>
          Añade información relevante que ayude a entender mejor el inmueble.
        </span>
      </div>

      <div className={styles.extrasGroup}>
        <div className={styles.extraColumn}>
          <h3 className={styles.subheading}>Extras de interior</h3>
          <div className={styles.checkboxList}>
            {INTERIOR_EXTRAS.map((extra) => (
              <label key={extra} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={value.interiorExtras.includes(extra)}
                  onChange={() => toggleInteriorExtra(extra)}
                />
                <span>{extra}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.extraColumn}>
          <h3 className={styles.subheading}>Extras de exterior</h3>
          <div className={styles.checkboxList}>
            {EXTERIOR_EXTRAS.map((extra) => (
              <label key={extra} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={value.exteriorExtras.includes(extra)}
                  onChange={() => toggleExteriorExtra(extra)}
                />
                <span>{extra}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onBack}
        >
          Atrás
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
