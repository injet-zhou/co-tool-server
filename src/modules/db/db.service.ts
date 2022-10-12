import { Injectable } from '@nestjs/common';
import { BuildTableDto } from './dto/build-table.dto';
import knex, { Knex } from 'knex';
import { DBType } from '../../libs/db/knex';
import { format } from 'sql-formatter';

@Injectable()
export class DbService {
  create(buildTableDto: BuildTableDto) {
    return buildTable(buildTableDto);
  }
}

const buildBaseFields = (table: Knex.CreateTableBuilder, options: any) => {
  const k = knex({ client: options.type });
  // CREATED_BY,CREATION_DATE,LAST_UPDATED_BY,LAST_UPDATE_DATE, DEL
  table.datetime('CREATION_DATE').defaultTo(k.fn.now());
  table.integer('CREATED_BY').defaultTo(-1);
  table.datetime('LAST_UPDATE_DATE').defaultTo(k.fn.now());
  table.integer('LAST_UPDATED_BY').defaultTo(-1);
  table.boolean('DEL').defaultTo(false);
};

const buildTable = (dto: BuildTableDto) => {
  const { tableName, columns, options } = dto;
  let k: Knex;
  switch (options.type) {
    case DBType.MSSQL:
      k = knex({ client: DBType.MSSQL });
      break;
    case DBType.MYSQL:
      k = knex({ client: DBType.MYSQL });
      break;
    default:
      knex({ client: DBType.MSSQL });
  }
  const table = k.schema.createTable(tableName, (table) => {
    columns.forEach((column) => {
      const {
        name,
        type,
        length,
        nullable,
        defaultValue,
        comment,
        isPrimaryKey,
      } = column;
      const col = table[type](name, length);
      if (nullable) {
        col.nullable();
      } else {
        col.notNullable();
      }
      if (defaultValue) {
        col.defaultTo(defaultValue);
      }
      if (comment) {
        col.comment(comment);
      }
      if (isPrimaryKey) {
        col.primary();
      }
    });
    buildBaseFields(table, options);
  });
  return format(table.toQuery());
};
