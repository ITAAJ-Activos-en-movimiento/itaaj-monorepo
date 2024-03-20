import React from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const NavigationMenu: React.FC = () => {
  const navItems: NavItemProps[] = [
    { icon: "📋", label: "General", href: "/" },
    { icon: "📢", label: "Mis anuncios", href: "/anuncios", isActive: true },
    { icon: "🔔", label: "Mis alertas", href: "/alertas" },
    { icon: "❤️", label: "Mis listas", href: "/listas" },
    { icon: "💬", label: "Mis mensajes", href: "/mensajes" },
    { icon: "👤", label: "Mi perfil", href: "/perfil" },
    { icon: "📥", label: "Mis descargadas", href: "/descargadas" },
  ];

  return (
    <nav className={styles.navContainer}>
      {navItems.map((item, index) => (
        <Link href={item.href} key={index} passHref>
          <div
            className={`${styles.navItem} ${
              item.isActive ? styles.active : ""
            }`}
          >
            <div className={styles.navIcon}>{item.icon}</div>
            <div className={styles.navLabel}>{item.label}</div>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;
