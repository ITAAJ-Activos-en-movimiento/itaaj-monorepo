"use client";

import { useRef, useState } from "react";
import styles from "./StepPhotos.module.css";
import { PublishFormData } from "@/app/(publish)/publish/page";
import { useUploadImage } from "@/modules/publish/hooks/useUploadImage";

interface StepPhotosProps {
  value: PublishFormData;
  onChange: (partial: Partial<PublishFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepPhotos: React.FC<StepPhotosProps> = ({
  value,
  onChange,
  onNext,
  onBack,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    uploadImage,
    isLoading: isUploadingCloudinary,
    errorMessage,
  } = useUploadImage();

  const handleClickSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = async (files: FileList | null) => {
    setError(null);

    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files!)) {
        if (!file.type.startsWith("image/")) {
          setError("Algunos archivos no son imágenes.");
          continue;
        }

        // ⬇️ Subida real a Cloudinary
        const uploadedUrl = await uploadImage(file);

        if (uploadedUrl) {
          uploadedUrls.push(uploadedUrl);
        }
      }

      if (uploadedUrls.length > 0) {
        onChange({ photos: [...value.photos, ...uploadedUrls] });
      }

      if (uploadedUrls.length === 0 && !error) {
        setError("No se pudo subir ninguna imagen.");
      }
    } catch (e) {
      console.error(e);
      setError("Ha ocurrido un error al subir las imágenes.");
    }
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    await handleFiles(files);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removePhoto = (url: string) => {
    const filtered = value.photos.filter((p) => p !== url);
    onChange({ photos: filtered });
  };

  const handleNext = () => {
    if (value.photos.length === 0) {
      setError("Sube al menos una fotografía del inmueble.");
      return;
    }
    onNext();
  };

  const isUploading = isUploadingCloudinary;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Fotos de tu anuncio</h2>

      <p className={styles.helper}>
        Al subir tus fotos podremos recomendarte extras y mejorar la visibilidad
        de tu anuncio.
      </p>

      <div
        className={styles.dropzone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClickSelect}
      >
        <div className={styles.dropzoneContent}>
          <p className={styles.dropzoneTitle}>Arrastra las fotografías aquí</p>
          <p className={styles.dropzoneSubtitle}>o si prefieres…</p>
          <button
            type="button"
            className={styles.selectButton}
            onClick={handleClickSelect}
          >
            Selecciónalas de tu dispositivo
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className={styles.hiddenInput}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {isUploading && <p className={styles.uploading}>Subiendo imágenes…</p>}

      {(error || errorMessage) && (
        <p className={styles.error}>{error || errorMessage}</p>
      )}

      {value.photos.length > 0 && (
        <div className={styles.galleryWrapper}>
          <h3 className={styles.subheading}>Vista previa</h3>
          <p className={styles.galleryHelper}>
            El orden lo podrás gestionar en el backend más adelante; por ahora
            puedes eliminar las fotos que no quieras.
          </p>

          <div className={styles.gallery}>
            {value.photos.map((url) => (
              <div key={url} className={styles.photoCard}>
                {/* En producción ideal usar <Image /> de next/image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt="Foto del inmueble"
                  className={styles.photo}
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removePhoto(url)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onBack}
          disabled={isUploading}
        >
          Atrás
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleNext}
          disabled={isUploading}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
