const env = process.env as any;
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD } = env;

export default {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
};
