import { init } from '@paralleldrive/cuid2';
import bcrypt from 'bcrypt';
import { getTableColumns } from 'drizzle-orm';
import { AnySQLiteTable } from 'drizzle-orm/sqlite-core';
import { AnySQLiteColumn } from 'drizzle-orm/sqlite-core';

export const cuid = () => {
  const createId = init({ length: 23 });
  return `cl${createId()}`;
};

export const hash = async (str: string) => {
  return await bcrypt.hash(str, 10);
};

export const exclude = (table: AnySQLiteTable, cols: AnySQLiteColumn[]) => {
  const columns = Object.assign({}, getTableColumns(table));

  for (const col of cols) {
    delete columns[col.name];
  }

  return columns;
};
