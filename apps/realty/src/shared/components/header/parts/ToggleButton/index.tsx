"use client";

import React from "react";
import styles from "./ToggleButton.module.css";
import { useUIStore } from "@/stores/ui";

const ToggleButton = () => {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <button
      aria-label="Toggle navigation"
      className={styles.navToggle}
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M3 6h14M3 10h14M3 14h14"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
};

export default ToggleButton;
