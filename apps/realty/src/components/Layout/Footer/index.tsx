import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

const language: any = {
  es: "Español",
  en: "English",
  fr: "French",
};

const Footer = () => {
  //   const { lang } = useTranslation();

  //   const {push, pathname, locales, asPath} = useRouter();

  const changeLanguage = (e: any) => {
    const locale = e.target.value;
    // push(pathname, asPath, { locale });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Terminos_y_contidiciones_itaaj.pdf";
    link.download = "Terminos_y_contidiciones_itaaj.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };
  const handleDownloadPriva = () => {
    const link = document.createElement("a");
    link.href = "/Políticas de Devolución v2.docx";
    link.download = "Políticas de Devolución v2.docx";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  const whatsappLink =
    typeof window !== "undefined"
      ? `https://api.whatsapp.com/send?phone=+5219995471508&text=Hola, me interesa hacer una consulta sobre ${window.location.href}`
      : "https://api.whatsapp.com/send?phone=+5219995471508&text=Hola, me interesa hacer una consulta sobre";

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div></div>
        <div className={styles.social}>
          <h2 className={styles.copy}></h2>
          <div className={styles.networks}>
            <Link
              href="https://instagram.com/itaaj.mx?igshid=YmMyMTA2M2Y="
              rel="noopener noreferrer"
              passHref
            >
              <i className="bx bxl-instagram"></i>
            </Link>
            <Link
              href="https://www.facebook.com/itaajrealty"
              rel="noopener noreferrer"
              passHref
            >
              <i className="bx bxl-facebook"></i>
            </Link>
            <Link href="/" passHref rel="noopener noreferrer">
              <i className="bx bxl-youtube"></i>
            </Link>
            <Link href="/" passHref rel="noopener noreferrer">
              <i className="bx bxl-twitter"></i>
            </Link>
            <Link
              href="https://www.linkedin.com/company/itaajonchain/"
              rel="noopener noreferrer"
              passHref
            >
              <i className="bx bxl-linkedin"></i>
            </Link>
          </div>
        </div>
        <div className={styles.nav}>
          <ul>
            <li className={styles.title}>Sobre Itaaj</li>
            <li>¿Quiénes somos?</li>
            <li>Nuestro Equipo</li>
            <li>
              <Link href="/terminos-condiciones">Términos y condiciones</Link>
            </li>
            <li>
              <Link href="/politicas-devolucion">Política de devolución</Link>
            </li>
            <li>Tecnología Blockchain</li>
          </ul>
          <ul>
            <li className={styles.title}>Links Rapidos</li>
            <Link href="/agents">
              <li>Asesores Externos</li>
            </Link>

            <Link href="/blog">
              <li>Blog</li>
            </Link>
            <Link href="/deals">
              <li>Portafolio de desarrolladores</li>
            </Link>
          </ul>
          <ul>
            <li className={styles.title}>Contáctanos</li>
            <li>Río Pánuco 91. Int 22 Colonia Cuauhtémoc Ciudad de México</li>
            <li>+52 1 999 547 1508</li>
            <li>contacto@itaaj.com.mx</li>
          </ul>
        </div>

        <div className={styles.legal}>
          <div className={styles.options}>
            <p>&copy; Copyright 2023, Itaaj Realty</p>
            <Link href="/legal">Aviso legal</Link>
            <Link href="/terminos-condiciones">Protección de datos</Link>
            <Link href="/terminos-condiciones">Política de cookies</Link>
          </div>
          {/* <select  onChange={changeLanguage} > */}
          {/* {locales?.map((locale) => ( */}
          {/* <option key={locale} value={locale}>{language[locale.toString()]}</option>         */}
          {/* ))} */}
          {/* </select> */}
        </div>
      </div>
      <div className={styles.float}>
        {/* <Link className={styles.itabot} title="Boton Asistente" href='/itabot'>
            <Image src="/sof.jpeg" alt="Imagen Asistente"  width={80} height={80} style={{
              borderRadius: 100
            }} />
        <p className={styles.text}>Hola soy Sofia tu asistente AI virtual</p>
  
            {' '}
        </Link> */}
        {/* <Link target="_blank" title="Boton Whatsapp" href={whatsappLink}>
            
            <MessageCircle />
            <Phone style={{
              position:'absolute',
              right: 18
            }} size={8} />
  
            {' '}
        </Link> */}
      </div>
    </footer>
  );
};

export default Footer;
