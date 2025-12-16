"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await fetch("https://itaaj-realty.onrender.com/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token"); 
      sessionStorage.clear();

      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};
