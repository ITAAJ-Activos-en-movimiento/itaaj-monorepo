"use client";

import Image from "next/image";
import styles from "./StepBasicData.module.css";
import { OPTIONS } from "./StepType";

interface StepBasicDataProps {
  value: any;
  onChange: (partial: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PROPERTY_TYPES = [
  "Casa",
  "Departamento",
  "Ático",
  "Dúplex",
  "Estudio",
  "Loft",
  "Chalet",
  "Planta baja",
  "Finca rústica",
];

const TRANSACTION_TABS: { key: any; label: string }[] = [
  { key: "sale", label: "Venta" },
  { key: "rent", label: "Alquiler" },
  { key: "share", label: "Comparto" },
];

export const StepBasicData: React.FC<StepBasicDataProps> = ({
  value,
  onChange,
  onNext,
  onBack,
}) => {
  const handleNext = () => {
    // aquí podrías validar campos requeridos antes de avanzar
    onNext();
  };

  const handleTransactionChange = (type: any) => {
    onChange({ transactionType: type });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Datos básicos del anuncio</h2>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Tipo de anuncio</label>

        <div className={styles.info}>
          <Image
            src={OPTIONS.find((opt) => opt.key == value.adType)?.image || ""}
            width={70}
            height={70}
            alt={OPTIONS.find((opt) => opt.key == value.adType)?.label!}
          />
          <span className={styles.cardTitle}>
            {OPTIONS.find((opt) => opt.key == value.adType)?.label}
          </span>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Tipo de vivienda *</label>
        <select
          className={styles.select}
          value={value.propertyType ?? ""}
          onChange={(e) => onChange({ propertyType: e.target.value || null })}
        >
          <option value="">Selecciona</option>
          {PROPERTY_TYPES.map((pt) => (
            <option key={pt} value={pt}>
              {pt}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Transacción *</label>
        <div className={styles.tabGroup}>
          {TRANSACTION_TABS.map((tab) => {
            const isActive = value.transactionType === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                onClick={() => handleTransactionChange(tab.key)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      {value.transactionType === "sale" && (
        <div className={styles.formFieldFull}>
          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={value.alsoRent}
              onChange={(e) => onChange({ alsoRent: e.target.checked })}
            />
            También lo rento
          </label>
        </div>
      )}

      {value.transactionType === "rent" && (
        <div className={styles.formFieldFull}>
          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={value.alsoSell}
              onChange={(e) => onChange({ alsoSell: e.target.checked })}
            />
            También lo vendo
          </label>
        </div>
      )}

      {(value.transactionType === "sale" || value.alsoSell) && (
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Precio de venta *</label>
          <div className={styles.inputWithSuffix}>
            <input
              className={styles.input}
              type="number"
              placeholder="Ej. 150000"
              value={value.salePrice ?? ""}
              onChange={(e) =>
                onChange({
                  salePrice: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
            <span className={styles.suffix}>€</span>
          </div>
        </div>
      )}

      {(value.transactionType === "rent" || value.alsoRent) && (
        <>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Precio de alquiler *</label>
            <div className={styles.inputWithSuffix}>
              <input
                className={styles.input}
                type="number"
                placeholder="Ej. 850"
                value={value.rentPrice ?? ""}
                onChange={(e) =>
                  onChange({
                    rentPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
              <span className={styles.suffix}>$/mes</span>
            </div>
          </div>

          <div className={styles.switchRow}>
            <label className={styles.switchLabel}>
              <input
                type="checkbox"
                checked={!!value.communityFeesIncluded}
                onChange={(e) =>
                  onChange({ communityFeesIncluded: e.target.checked })
                }
              />
              Gastos de mantenimiento incluidos en el precio
            </label>

            <label className={styles.switchLabel}>
              <input type="checkbox" />
              Se requiere menos de dos meses de deposito
            </label>
          </div>
        </>
      )}

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Superficie construida *</label>
        <div className={styles.inputWithSuffix}>
          <input
            className={styles.input}
            type="number"
            placeholder="Ej. 150"
            value={value.builtArea ?? ""}
            onChange={(e) =>
              onChange({
                builtArea: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
          <span className={styles.suffix}>m²</span>
        </div>
      </div>
      <div className={styles.formFieldFull}>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            checked={value.shareCom}
            onChange={(e) => onChange({ shareCom: e.target.checked })}
          />
          Comparto comisión
        </label>
      </div>

      {value.shareCom && (
        <>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Porcentaje *</label>
            <div className={styles.inputWithSuffix}>
              <input
                className={styles.input}
                type="number"
                placeholder="Ej. 10"
                value={value.lowDeposit ?? 0}
                onChange={(e) =>
                  onChange({
                    lowDeposit: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
              <span className={styles.suffix}>%</span>
            </div>
          </div>
        </>
      )}
      {/* Habitaciones / baños – como botones 0 1 2 3 4 +5 */}
      <div className={styles.inlineGroup}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Número de habitaciones</label>
          <div className={styles.chipGroup}>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.chip} ${
                  value.bedrooms === n ? styles.chipActive : ""
                }`}
                onClick={() => onChange({ bedrooms: n })}
              >
                {n === 5 ? "+5" : n}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Número de baños</label>
          <div className={styles.chipGroup}>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.chip} ${
                  value.bathrooms === n ? styles.chipActive : ""
                }`}
                onClick={() => onChange({ bathrooms: n })}
              >
                {n === 5 ? "+5" : n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Antigüedad</label>
        <select
          className={styles.select}
          value={value.age ?? ""}
          onChange={(e) => onChange({ age: e.target.value || null })}
        >
          <option value="">Selecciona</option>
          <option value="1">Menos de 1 año</option>
          <option value="2">1 a 5 años</option>
          <option value="3">5 a 10 años</option>
          <option value="4">10 a 20 años</option>
          <option value="5">20 a 30 años</option>
          <option value="6">30 a 50 años</option>
          <option value="7">50 a 70 años</option>
          <option value="8">70 a 100 años</option>
          <option value="9">+100 años</option>
        </select>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Estado del inmueble</label>
        <select
          className={styles.select}
          value={value.state ?? ""}
          onChange={(e) => onChange({ state: e.target.value || null })}
        >
          <option value="">Selecciona</option>
          <option value="1">Casi nuevo</option>
          <option value="2">Muy bien</option>
          <option value="3">Bien</option>
          <option value="4">A reformar</option>
          <option value="5">Renovado</option>
        </select>
      </div>
      {/* Aquí podrías agregar selects de antigüedad, estado, certificado, etc. */}

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
