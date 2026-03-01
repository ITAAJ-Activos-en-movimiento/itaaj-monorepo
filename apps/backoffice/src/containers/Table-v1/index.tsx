import styles from "./Table.module.css";
import { fromNow } from "@/utilities/date-formater";
import { ContextMenu } from "@/components";
import { useState } from "react";
import { DivisaFormater } from "@/utilities/divisa-formater";
interface DataRecord {
  [key: string]: any;
}
interface Props<T extends DataRecord> extends Partial<any> {
  data: T[];
  headers: string[];
  count: number;
  setLimit: Function;
  setPage: Function;
  limit: number;
  deleteItem: Function;
  setItemSelected: Function;
}

const TableV1 = <T extends DataRecord>({
  limit,
  count,
  data,
  headers,
  setLimit,
  deleteItem,
  setPage,
  pageInfo,
  setItemSelected,
}: Props<T>) => {
  const [openMenu, setOpenMenu] = useState<string>("");
  const showInit = limit * ((pageInfo?.page || 1) - 1) + 1;
  const showEnd =
    Math.ceil(count / (pageInfo?.pages || 1)) * (pageInfo?.page || 1);

  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d.id}>
              {headers.map((header) => (
                <td key={header}>
                  {" "}
                  {header == "Price"
                    ? DivisaFormater({
                        value: parseFloat(d[header.toLowerCase()]),
                        currency: "USD",
                        format: "en-US",
                      })
                    : d[header.toLowerCase()]}
                </td>
              ))}
              <td>{fromNow(d.createdAt)}</td>

              <td>
                <ContextMenu
                  item={d}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  deleteItem={deleteItem}
                  setItemSelected={setItemSelected}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.table_footer}>
        <div className={styles.show}>
          <span>
            Showing {showInit}-{showEnd} of {count} results
          </span>
        </div>

        <div>
          <span>Items per page</span>
          <select
            name=""
            id=""
            onChange={({ target }) => setLimit(target.value)}
          >
            <option value={4000}>All</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <button
            className={!pageInfo?.hasPreviousPage ? "disable_btn" : ""}
            disabled={!pageInfo?.hasPreviousPage}
            onClick={() => setPage(pageInfo?.previousPage)}
          >
            <i className="bx bx-chevron-left"></i>
          </button>
          <button
            className={!pageInfo?.hasNextPage ? "disable_btn" : ""}
            disabled={!pageInfo?.hasNextPage}
            onClick={() => setPage(pageInfo?.nextPage)}
          >
            <i className="bx bx-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableV1;
