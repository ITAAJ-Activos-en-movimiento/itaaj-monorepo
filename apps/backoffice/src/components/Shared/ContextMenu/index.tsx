import { FunctionComponent } from "react";
import styles from "./ContextMenu.module.css";
import { MoreVertical } from "react-feather";

interface Props {
  item: any;
  openMenu: string;
  setOpenMenu: React.Dispatch<React.SetStateAction<string>>;
  deleteItem: Function;
  setItemSelected: Function;
}

const ContextMenu: FunctionComponent<Props> = ({
  item,
  openMenu,
  setOpenMenu,
  deleteItem,
  setItemSelected,
}) => {
  console.log("ITEM",item)
  const handlerMenu = (uuid: string): void => {
    setOpenMenu(openMenu === uuid ? "" : uuid);
  };

  return (
    <div className={styles.actions}>
      <button
        className={styles.btn_context}
        onClick={() => handlerMenu(item.id)}
      >
        <MoreVertical />
      </button>
      <div
        className={`${styles.context_menu} ${
          openMenu === item.id ? styles.active : ""
        }`}
      >
        <button
          className={styles.editButton}
          onClick={() => setItemSelected(item)}
        >
          Editar
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => deleteItem(item.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ContextMenu;
