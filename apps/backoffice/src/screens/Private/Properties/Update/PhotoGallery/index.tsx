import { ImageInput } from "@/components";
import styles from "./Photo.module.css";
import { useEffect, useState } from "react";
import { useUploadImage } from "@/hooks";

interface GalleryProps {
  oldUrls: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const PhotoGalleryUpdate = ({ oldUrls, setImages }: GalleryProps) => {
  const { isLoading, urls: initialUrls, uploadImage } = useUploadImage();
  const mergedUrls = [...oldUrls, ...initialUrls];
  const [urls, setUrls] = useState<string[]>(mergedUrls);

  const deletePhoto = (url: string) => {
    const newUrls = urls.filter((u) => u !== url);
    setUrls(newUrls);
  };

  useEffect(() => {
    const mergedUrls = [...oldUrls, ...initialUrls];
    setUrls(mergedUrls)
    setImages(mergedUrls);
  }, [oldUrls, initialUrls]);

  console.log(uploadImage);

  return (
    <div>
      <h3>Photos gallery</h3>
      <p>Organize and display your photos</p>
      <ImageInput
        // preview={url || placeholderImage}
        uploadImage={uploadImage}
        loading={isLoading}
        src={urls[0] || ""}
        alt=""
        width={300}
        height={300}
      />

      <div className={styles.images}>
        {urls.map((url: string) => (
          <>
            <div className={styles.cnt_img}>
              <img className={styles.property_image} src={url} alt="" />
              <button className={styles.btn} onClick={() => deletePhoto(url)}>
                X
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default PhotoGalleryUpdate;
