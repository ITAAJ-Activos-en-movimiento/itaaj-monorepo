"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";
import { useUIStore } from "@/stores/ui";

export function SidebarClient() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    if (sidebarOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const el = panelRef.current?.querySelector<HTMLElement>(
      "a,button,input,select,textarea,[tabindex]"
    );
    el?.focus();
  }, [sidebarOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.show : ""}`}
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`${styles.panel} ${sidebarOpen ? styles.open : ""}`}
        aria-hidden={!sidebarOpen}
        aria-label="Sidebar navigation"
        ref={panelRef}
      >
        <div className={styles.header}>
          <button
            className={styles.closeBtn}
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
          <span className={styles.brandText}>itaaj realty</span>
        </div>

        <nav className={styles.section}>
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Ayuda y sugerencias
          </Link> */}
          <Link
            href="/comprar/viviendas"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Comprar
          </Link>
          <Link
            href="/rentar/viviendas"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Rentar
          </Link>
          <Link
            href="/vende-tu-propiedad"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Vender
          </Link>
          <Link
            href="/blog"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Actualidad
          </Link>
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Índice de precios
          </Link> */}
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Guia de barrios
          </Link> */}
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Novedades
          </Link> */}
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Buscador de inmobiliarias
          </Link> */}
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Tasacion online
          </Link> */}
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Hipotecas
          </Link> */}
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Publicadores profesionales
          </Link> */}
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Publicadores particulares
          </Link> */}
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Vende con agencia
          </Link> */}
          {/* <Link
            href="/"
            className={styles.link}
            onClick={() => setSidebarOpen(false)}
          >
            Itaaj Seguros
          </Link> */}
        </nav>
      </aside>
    </>
  );
}
