"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./UserMenu.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Cog, Heart, Home, Mail, Trash } from "lucide-react";

type User = {
  name?: string;
  email?: string;
  avatar?: string;
};

export const UserMenu = ({ user }: { user: User }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = [
    {
      label: "Mis anuncios publicados",
      icon: <Home strokeWidth="1px" size={18} />,
      href: "/user/mis-anuncios",
    },
    {
      label: "Mis listas",
      icon: <Heart strokeWidth="1px" size={18} />,
      href: "/lists",
    },
    {
      label: "Mis alertas",
      icon: <Bell strokeWidth="1px" size={18} />,
      href: "/alerts",
    },
    {
      label: "Mis mensajes",
      icon: <Mail strokeWidth="1px" size={18} />,
      href: "/messages",
    },
    {
      label: "Mi perfil",
      icon: <Cog strokeWidth="1px" size={18} />,
      href: "/profile",
    },
    {
      label: "Mis descartados",
      icon: <Trash strokeWidth="1px" size={18} />,
      href: "/discarded",
    },
  ];

  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button
        className={styles.userButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src={user.avatar || "/logged_in_avatar.svg"}
          alt="avatar"
          width={32}
          height={32}
          className={styles.avatar}
        />
        <span className={styles.arrow}>▼</span>
      </button>

      {open && (
        <div className={styles.menu}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Hola, {user.name || "Usuario"}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>

          <div className={styles.divider} />

          <ul className={styles.list}>
            {items.map((item) => (
              <li
                key={item.label}
                className={styles.item}
                onClick={() => router.push(item.href)}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>

          <div className={styles.divider} />

          <button className={styles.logoutButton} onClick={handleLogout}>
            ↩ Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};
