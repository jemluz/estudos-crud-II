/*
  BACKEND - CREDENCIAIS DO BANCO DE DADOS
*/

module.exports = {
  client: 'mysql',
  connection: {
    database: 'web2t1',
    user: 'root',
    password: 'admin'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
