import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import Header from "./_components/Header";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL("https://itaajrealty.com"),
  title: "Itaaj Realty: compra y venta de inmuebles en México",
  description:
    'Más de 1.500.000 departamentos en venta, casas y oficinas nuevos o de segunda mano. Vende o compra tu departamento o casa en Itaaj Realty completamente GRATIS!"',
  applicationName: "Itaaj Realty",
  keywords: ["Inmuebles", "Propiedades", "Departamentos", "Casas", "Lofts"],
};

export default async function PublishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>    
        <Header />  
        {children}
      </body>
    </html>
  );
}
