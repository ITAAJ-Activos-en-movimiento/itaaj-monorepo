import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  Briefcase,
  // ChevronRight,
  // Crosshair,
  Home,
  // BookOpen,
  // Filter,
  // Paperclip,
  // User,
} from "react-feather";
import Tooltip from "../Tooltip";
import { Settings2, Share, SunDim, UserCircle } from "lucide-react";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user') as string | "{}");


  return (
    // <aside className={styles.sidebar}>
    //   <div className={styles.header_left}>
    //     <nav className={styles.nav}>
    //       <button>
    //         <ChevronRight />
    //       </button>
    //       <Tooltip text="Desarrollos">
    //         <Link to="/developments" title="Desarrollos">
    //           <Briefcase size={20} /> <p>Desarrollos</p>{" "}
    //         </Link>
    //       </Tooltip>
    //       <Tooltip text="Propiedades para desarrollos">
    //         <Link
    //           to="/properties-developments"
    //           title="Propiedades para desarrollos"
    //         >
    //           <Paperclip size={20} /> <p>Modelos de D.</p>{" "}
    //         </Link>
    //       </Tooltip>
    //       <Tooltip text="Propiedades">
    //         <Link to="/properties" title="Propiedades">
    //           <Home size={20} /> <p>Propiedades</p>{" "}
    //         </Link>
    //       </Tooltip>
    //         <Tooltip text="Propiedades">
    //         <Link to="/compartidos" title="Propiedades con comisión">
    //           <Share size={20} /> <p>Propiedades con comisión</p>{" "}
    //         </Link>
    //       </Tooltip>
    //       {/* <Tooltip text="Propuestas economicas">
    //         <Link to="/proposals" title="Proposals">
    //           <Crosshair size={20} /> <p>Propuestas</p>{" "}
    //         </Link>
    //       </Tooltip> */}
    //       <Tooltip text="Análisis de Mercado">
    //         <Link to="/market" title="Analisis de Mercado">
    //           <BookOpen size={20} /> <p>Análisis de M.</p>{" "}
    //         </Link>
    //       </Tooltip>
    //       {/* <Tooltip text="Embudo de Ventas">
    //         <Link to="/crm/funnels" title="Embudo">
    //           <Filter size={20} /> <p>Embudo</p>{" "}
    //         </Link>
    //       </Tooltip> */}
    //       {/* <Tooltip text="Blog">
    //         <Link to="/blogs" title="Blog">
    //           <BookOpen size={20} /> <p>Blog</p>{" "}
    //         </Link>
    //       </Tooltip> */}
    //       {/* <Tooltip text="Usuarios">
    //         <Link to="/users" title="Usuarios">
    //           <User size={20} /> <p>Usuarios</p>{" "}
    //         </Link>
    //       </Tooltip> */}
    //       <Tooltip text="Generador de contenido">
    //         <Link to="/generator" title="Generador de contenido">
    //           <TableOfContents size={20} /> <p>Generador de contenido</p>{" "}
    //         </Link>
    //       </Tooltip>
    //     </nav>
    //   </div>
    // </aside>

    <aside className={styles.sidebar} >
      <div className={styles.header} >
        <h3>Itaaj Realty Pro</h3>
      </div>
      <Tooltip text="Desarrollos">
             <Link to="/developments" title="Desarrollos">
               <Briefcase size={18} strokeWidth="1.5px" /> <p>Desarrollos</p>{" "}
            </Link>
      </Tooltip>
      <Tooltip text="Propiedades">
        <Link to="/properties" title="Propiedades">
          <Home size={18} strokeWidth="1.5px" /> <p>Propiedades</p>
        </Link>
      </Tooltip>
      <Tooltip text="Propiedades">
             <Link to="/compartidos" title="Propiedades compartidas">
               <Share size={18} strokeWidth="1.5px" /> <p>Propiedades compartidas</p>{" "}
             </Link>
      </Tooltip>

      <div className={styles.options} >
           <Tooltip text="Apariencia">
             <Link to="/" title="Apariencia">
               <SunDim size={18} strokeWidth="1.5px" /> <p>Apariencia</p>{" "}
             </Link>
      </Tooltip>
         <Tooltip text="Configuracion">
             <Link to="/" title="Configuracion">
               <Settings2 size={18} strokeWidth="1.5px" /> <p>Configuracion</p>{" "}
             </Link>
      </Tooltip>
         <Tooltip text="Propiedades">
             <Link to="/" title="Propiedades compartidas">
               <UserCircle size={18} strokeWidth="1.5px" /> <p>Perfil</p>{" "}
             </Link>
      </Tooltip>

         <Tooltip text="">
             <Link to="/" title="">
               <p>{user?.name} {user?.lastname}</p>{" "}
             </Link>
      </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
