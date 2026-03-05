"use client";

import { useState } from "react";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dv4bzgfpr/image/upload";
const UPLOAD_PRESET = "infoitaaj"; 

export const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUrl, setLastUrl] = useState<string>("");
  const [urls, setUrls] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const uploadImage = async (image: Blob | File): Promise<string | null> => {
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", image); // Cloudinary exige "file"
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const { data } = await axios.post(CLOUDINARY_URL, formData);

      const secureUrl = data.secure_url as string;
      const newUrls = [...urls, secureUrl];

      setUrls(newUrls);
      setLastUrl(secureUrl);

      return secureUrl;
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error?.message || "Upload failed");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    lastUrl,
    urls,
    uploadImage,
    errorMessage,
  };
};
