import { Knex } from 'knex';
import mssqlConfig from '../../config/db/mssql';
import mysqlConfig from '../../config/db/mysql';

enum DBType {
  MYSQL = 'mysql',
  MSSQL = 'mssql',
}

const KMssql = (database: string) => {
  return new Knex.Client({
    client: DBType.MSSQL,
    connection: {
      host: mssqlConfig.host,
      port: mssqlConfig.port,
      user: mssqlConfig.username,
      password: mssqlConfig.password,
      database,
    },
  });
};

const KMySql = (database: string) => {
  return new Knex.Client({
    client: DBType.MYSQL,
    connection: {
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      user: mysqlConfig.username,
      password: mysqlConfig.password,
      database,
    },
  });
};

export { KMssql, KMySql, DBType };
