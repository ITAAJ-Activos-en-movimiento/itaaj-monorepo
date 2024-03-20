import { ReactNode } from "react";
import { Home } from "react-feather";

export interface Card {
  icon: string; 
  title: string;
  subtitle: string;
  url: string;
}

export const cardsData: Card[] = [
  {
    url: "/mis-anuncios-publicados",
    icon: "/icons/1.png",
    title: "Mis anuncios publicados",
    subtitle: "Edita tus anuncios",
  },
  {
    url: "",
    icon: "/icons/2.png",
    title: "Mis listas",
    subtitle: "Organiza tus listas",
  },
  {
    url: "",
    icon: "/icons/3.png",
    title: "Mis alertas",
    subtitle: "Configura tus alertas (recuerdos, filtros...)",
  },
  {
    url: "",
    icon: "/icons/4.png",
    title: "Mis mensajes",
    subtitle: "Chatea con los anunciantes",
  },
  {
    url: "",
    icon: "/icons/5.png",
    title: "Mi perfil",
    subtitle: "Tus datos, password, consentimientos...",
  },
  {
    url: "",
    icon: "/icons/6.png",
    title: "Mis descargados",
    subtitle: "Siempre puedes recuperarlos...",
  },
];

export interface User {
  method: string;
  email: string;
  name: string;
  lastname: string;
  password: string;
  phone: number;
  birthdate: Date;
  state: string;
  city: string;
  country: string;
  gender: string;
}

export const userData: User = {
  method: "email",
  email: "ejemplo@correo.com",
  name: "Juan",
  lastname: "Pérez",
  password: "contraseña123",
  phone: 123456789,
  birthdate: new Date("1990-01-01"),
  state: "Estado",
  city: "Ciudad",
  country: "País",
  gender: "Masculino",
};
