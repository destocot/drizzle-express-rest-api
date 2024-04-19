import { init } from "@paralleldrive/cuid2";
import { getTableColumns } from "drizzle-orm";
import { TableConfig } from "drizzle-orm/sqlite-core";
import { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";

export const cuid = () => {
  const createId = init({ length: 23 });
  return `cl${createId()}`;
};

export const exclude = <T extends TableConfig>(
  table: SQLiteTableWithColumns<T>,
  cols: Array<keyof T["columns"]>
) => {
  const columns = Object.assign({}, getTableColumns(table));
  cols.forEach((col) => delete columns[col]);
  return columns;
};
