"use client";

import { AdType } from "@/app/(publish)/publish/page";
import styles from "./StepSelectType.module.css";
import Image from "next/image";

interface StepSelectTypeProps {
  value: AdType | null;
  onChange: (value: AdType) => void;
  onNext: () => void;
}

export const OPTIONS: {
  key: AdType;
  label: string;
  image: string;
  desc: string;
}[] = [
  {
    key: "housing",
    label: "Vivienda",
    image: "/property-type-home.svg",
    desc: "Inmueble residencial ya sea piso, apartamento, casa, chalet o vivienda apareada.",
  },
  {
    key: "parking",
    label: "Parking",
    image: "/property-type-garage.svg",
    desc: "Espacio físico donde se deja un vehículo por un tiempo indeterminado.",
  },
  {
    key: "office",
    label: "Oficina",
    image: "/property-type-office.svg",
    desc: "Espacio destinado al trabajo.",
  },
  {
    key: "storage",
    label: "Bodega",
    image: "/property-type-boxroom.svg",
    desc: "Lugar o espacio físico para el almacenaje de bienes.",
  },
  {
    key: "land",
    label: "Terrenos y solares",
    image: "/property-type-land.svg",
    desc: "Superficie de suelo con espacio que no ha sido edificado.",
  },
  {
    key: "local",
    label: "Local",
    image: "/property-type-commercial-store.svg",
    desc: "Espacio, normalmente situado en la planta baja de un edificio, destinado al desarrollo de una actividad economica",
  },
];

export const StepSelectType: React.FC<StepSelectTypeProps> = ({
  value = "housing",
  onChange,
  onNext,
}) => {
  const handleContinue = () => {
    if (!value) return;
    onNext();
  };

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div>
          <h2 className={styles.heading}>¿Qué anuncio quieres publicar?</h2>
          <p className={styles.helper}>
            Selecciona el tipo de anuncio que quieres publicar. Más adelante
            podrás completar los detalles del inmueble.
          </p>
        </div>

        <div className={styles.grid}>
          {OPTIONS.map((option) => {
            const isActive = value === option.key;

            return (
              <button
                key={option.key}
                type="button"
                className={`${styles.card} ${
                  isActive ? styles.cardActive : ""
                }`}
                onClick={() => onChange(option.key)}
              >
                <Image
                  src={option.image}
                  width={50}
                  height={50}
                  alt={option.label}
                />
                <span className={styles.cardTitle}>{option.label}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleContinue}
            disabled={!value}
          >
            Empezar
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <h4 className={styles.def}>Revisa la definiciión:</h4>
        <Image
          src={OPTIONS.find((opt) => opt.key == value)?.image || ""}
          width={50}
          height={50}
          alt={OPTIONS.find((opt) => opt.key == value)?.label!}
        />
        <span className={styles.cardTitle}>
          {OPTIONS.find((opt) => opt.key == value)?.label}
        </span>
        <p className={styles.desc}>
          {OPTIONS.find((opt) => opt.key == value)?.desc}
        </p>
      </div>
    </div>
  );
};
