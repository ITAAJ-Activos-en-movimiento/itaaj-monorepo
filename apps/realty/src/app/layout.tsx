import "./globals.css";
import type { Metadata } from "next";
import { Footer, Header } from '@/components'
import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/shared/context/AuthContext';
import MetaMask from "./MetaMask";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://itaajrealty.com"),
  title: "Itaaj Realty: compra y venta de inmuebles en México",
  description:
    'Más de 1.500.000 departamentos en venta, casas y oficinas nuevos o de segunda mano. Vende o compra tu departamento o casa en Itaaj Realty completamente GRATIS!"',
  applicationName: "Itaaj Realty",
  keywords: ["Inmuebles", "Propiedades", "Departamentos", "Casas", "Lofts"],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="es">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1263776837578791');
            fbq('track', 'PageView');
          `
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-11242537243/4DT-CP2mqMAYEJuC7vAp',
                  'event_callback': callback
              });
              return false;
            }
            `
          }}
        />
        <noscript><img height="1" width="1" style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1263776837578791&ev=PageView&noscript=1"
        /></noscript>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4461YFKK2V">
        </script>
        <script dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-4461YFKK2V');            
          ` }} />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WNSWVR2CSG"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WNSWVR2CSG');
      `,
          }}
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '178858151857801');
            fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=178858151857801&ev=PageView&noscript=1"
          />
        </noscript>

        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />

        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <AuthContextProvider>
        <MetaMask>
          <body className={inter.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </MetaMask>
      </AuthContextProvider>
    </html>
  );
}
