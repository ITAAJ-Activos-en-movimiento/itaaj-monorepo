"use client";

import { useState } from "react";
import styles from "./Publish.module.css";
import { Stepper } from "@/modules/publish/components/listing-wizard/Stepper";
import { StepBasicData } from "@/modules/publish/components/listing-wizard/steps/StepBasicData";
import { StepAddress } from "@/modules/publish/components/listing-wizard/steps/StepAddress";
import { StepPhotos } from "@/modules/publish/components/listing-wizard/steps/StepPhotos";
import { StepDetails } from "@/modules/publish/components/listing-wizard/steps/StepDetails";
import { StepContact } from "@/modules/publish/components/listing-wizard/steps/StepContact";
import { StepSelectType } from "@/modules/publish/components/listing-wizard/steps/StepType";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

export type AdType =
  | "housing"
  | "parking"
  | "office"
  | "storage"
  | "land"
  | "local";

export type TransactionType = "sale" | "rent" | "share";

export interface PublishFormData {
  // Paso 0 – tipo de anuncio
  adType: AdType | null;

  // Paso 1 – datos básicos
  propertyType: string | null; // Piso, Casa, Ático, etc.
  transactionType: TransactionType | null;
  salePrice?: number;
  rentPrice?: number;
  communityFeesIncluded?: boolean;
  lowDeposit?: boolean;
  builtArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  age?: string | null;
  condition?: string | null;
  energyCertificate?: string | null;
  alsoRent: boolean;
  alsoSell: boolean;

  // Paso 2 – dirección
  city?: string;
  street?: string;
  streetNumber?: string;
  hideExactAddress?: boolean;
  orientation?: string | null;
  // aquí podrías guardar lat/lng si lo necesitas

  // Paso 3 – fotos
  photos: string[]; // URLs una vez subidas

  // Paso 4 – descripción y extras
  description?: string;
  interiorExtras: string[];
  exteriorExtras: string[];

  // Paso 5 – contacto
  contactEmail?: string;
  contactPhone?: string;

  lat?: number;
  lng?: number;
  owner?: string;
}

const steps = [
  { id: 0, label: "Tipo de anuncio" },
  { id: 1, label: "Datos básicos" },
  { id: 2, label: "Dirección" },
  { id: 3, label: "Fotos" },
  { id: 4, label: "Detalles" },
  { id: 5, label: "Contacto" },
];

const INITIAL_DATA: PublishFormData = {
  adType: "housing",
  propertyType: null,
  transactionType: null,
  alsoRent: false,
  alsoSell: false,
  photos: [],
  interiorExtras: [],
  exteriorExtras: [],
  owner: "",
};

export default function PublishPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<PublishFormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const updateData = (partial: Partial<PublishFormData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const next = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const back = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const { data: res } = await axios.post(
        "https://itaaj-realty.onrender.com/api/v1/properties",
        {
          ...data,
          name: data.adType + " " + data.city + " " + data.transactionType,
          price: data.salePrice || data.rentPrice,
          images: data.photos,
          area: { total_area: data.builtArea },
          status: "active",
          category: "general",
          location: {
            latitude: data.lat,
            longitude: data.lng,
          },
        },
        {
          headers: {
            "api-key":
              "a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd",
          },
        }
      );

      router.push(`/confirmacion-anuncio/${res[0].id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="203221248558-a6j3egm9pakf8d8c3m2be7vm18k802db.apps.googleusercontent.com">
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Publica tu anuncio en Itaaj</h1>
        </header>

        {currentStep !== 0 && (
          <Stepper steps={steps} currentStep={currentStep} />
        )}

        <main className={currentStep !== 0 ? styles.card : styles.mainCard}>
          {currentStep === 0 && (
            <StepSelectType
              value={data.adType}
              onChange={(adType: any) => updateData({ adType })}
              onNext={next}
            />
          )}

          {currentStep === 1 && (
            <StepBasicData
              value={data}
              onChange={updateData}
              onNext={next}
              onBack={back}
            />
          )}

          {currentStep === 2 && (
            <StepAddress
              value={data}
              onChange={updateData}
              onNext={next}
              onBack={back}
            />
          )}

          {currentStep === 3 && (
            <StepPhotos
              value={data}
              onChange={updateData}
              onNext={next}
              onBack={back}
            />
          )}

          {currentStep === 4 && (
            <StepDetails
              value={data}
              onChange={updateData}
              onNext={next}
              onBack={back}
            />
          )}

          {currentStep === 5 && (
            <StepContact
              value={data}
              onChange={updateData}
              onBack={back}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}
