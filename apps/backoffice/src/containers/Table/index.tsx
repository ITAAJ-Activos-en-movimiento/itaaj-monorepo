import React, { createContext, ReactNode, useContext } from "react";
import styles from "./Table.module.css";

interface TableContextProps {
  columns: string;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

interface TableProps {
  columns: string;
  children: ReactNode;
}

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <table className={styles.table} role="table">
        {children}
      </table>
    </TableContext.Provider>
  );
}

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  const { columns } = useContext(TableContext)!;
  return (
    <div style={{ display: "grid", gridTemplateColumns: columns }} className={`${styles.header} ${styles.common_row}`} role="row">
      {React.Children.map(children, (child, index) => (
        <div key={index} style={{ gridColumn: `${index + 1}` }}>
          {child}
        </div>
      ))}
    </div>
  );
}

interface RowProps {
  children: ReactNode;
}

function Row({ children }: RowProps) {
  const { columns } = useContext(TableContext)!;
  return (
    <div style={{ gridTemplateColumns: columns }} className={`${styles.row} ${styles.common_row}`} role="row">
      {children}
    </div>
  );
}

interface BodyProps<T> {
  data: T[];
  render: (item: T, index: number) => ReactNode;
}

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length) return <p className={styles.empty}>No data to show at the moment</p>;

  return (
    <section className={styles.body}>
      {data.map((item, index) => (
        <div key={index} className={styles.row}>
          {render(item, index)}
        </div>
      ))}
    </section>
  );
}

interface FooterProps {
  children: ReactNode;
}

function Footer({ children }: FooterProps) {
  return (
    <footer className={styles.footer}>
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
