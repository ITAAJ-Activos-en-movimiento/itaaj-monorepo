import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  Briefcase,
  ChevronRight,
  Crosshair,
  Home,
  BookOpen,
  Filter,
  Paperclip,
  User,
} from "react-feather";
import Tooltip from "../Tooltip";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header_left}>
        <nav className={styles.nav}>
          <button>
            <ChevronRight />
          </button>
          <Tooltip text="Desarrollos">
            <Link to="/developments" title="Desarrollos">
              <Briefcase size={20} /> <p>Desarrollos</p>{" "}
            </Link>
          </Tooltip>
          <Tooltip text="Propiedades para desarrollos">
            <Link
              to="/properties-developments"
              title="Propiedades para desarrollos"
            >
              <Paperclip size={20} /> <p>Modelos de D.</p>{" "}
            </Link>
          </Tooltip>
          <Tooltip text="Propiedades">
            <Link to="/properties" title="Propiedades">
              <Home size={20} /> <p>Propiedades</p>{" "}
            </Link>
          </Tooltip>
          <Tooltip text="Propuestas economicas">
            <Link to="/proposals" title="Proposals">
              <Crosshair size={20} /> <p>Propuestas</p>{" "}
            </Link>
          </Tooltip>
          <Tooltip text="Análisis de Mercado">
            <Link to="/market" title="Analisis de Mercado">
              <BookOpen size={20} /> <p>Análisis de M.</p>{" "}
            </Link>
          </Tooltip>
          <Tooltip text="Embudo de Ventas">
            <Link to="/crm/funnels" title="Embudo">
              <Filter size={20} /> <p>Embudo</p>{" "}
            </Link>
          </Tooltip>
          <Tooltip text="Blog">
            <Link to="/blogs" title="Blog">
              <BookOpen size={20} /> <p>Blog</p>{" "}
            </Link>
          </Tooltip>
          <Tooltip text="Usuarios">
            <Link to="/users" title="Usuarios">
              <User size={20} /> <p>Usuarios</p>{" "}
            </Link>
          </Tooltip>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
