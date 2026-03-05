"use client";
import React, { useState } from "react";
import styles from "./MyAds.module.css";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const Delete = ({ id }: { id: string }) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const { data: res } = await axios.patch(
        `https://itaaj-realty.onrender.com/api/v1/properties/${id}/delete`,
        {
          headers: {
            "api-key":
              "a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd",
          },
        }
      );

      router.refresh();
    } catch (err) {
    } finally {
      setDeleting(false);
    }
  };
  return (
    <button onClick={handleDelete} className={styles.iconButton}>
      {deleting ? (
        <span className={styles.spin}>
          <Loader size={18} /> Eliminando
        </span>
      ) : (
        "Eliminar"
      )}
    </button>
  );
};

export default Delete;
