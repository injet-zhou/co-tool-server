const env = process.env as any;
const {
  MSSQL_HOST: host,
  MSSQL_PORT: port,
  MSSQL_USER: user,
  MSSQL_PASSWORD: password,
} = env;

export default {
  type: 'mssql',
  host,
  port: parseInt(port, 10) || 1433,
  username: user,
  password,
};
