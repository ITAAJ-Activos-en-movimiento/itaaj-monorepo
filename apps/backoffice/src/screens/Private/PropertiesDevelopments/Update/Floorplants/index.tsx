import { ImageInput } from "@/components";
import { useEffect, useState } from "react";
import styles from "./Photo.module.css";
import { useUploadImage } from "@/hooks";

interface Props {
  oldUrls: string[];
  setFloorplants: React.Dispatch<React.SetStateAction<string[]>>;
}

const Floorplants = ({ oldUrls, setFloorplants }: Props) => {
  const { isLoading, urls: initialUrls, uploadImage } = useUploadImage();
  const mergedUrls = [...oldUrls, ...initialUrls];
  const [urls, setUrls] = useState<string[]>(mergedUrls);

  const deletePhoto = (url: string) => {
    const newUrls = urls.filter((u) => u !== url);
    setUrls(newUrls);
  };

  useEffect(() => {
    const mergedUrls = [...oldUrls, ...initialUrls];
    setUrls(mergedUrls);
    setFloorplants(mergedUrls);
  }, [oldUrls, initialUrls]);

  return (
    <div>
      <h3>Editar informacion de planos</h3>

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

export default Floorplants;
