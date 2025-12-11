"use client";
import { useState } from "react";

const SharePdf = ({ slug }: { slug: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pdf?slug=${encodeURIComponent(slug)}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ficha-${slug}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? "Generando ficha..." : "Descargar ficha PDF"}
    </button>
  );
};

export default SharePdf;
