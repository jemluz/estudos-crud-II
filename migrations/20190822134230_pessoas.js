/*
  BACKEND - DEFINIÇÃO DAS LINHAS DA TABELA DE USUÁRIO
*/

exports.up = function(knex, Promise) {
  return knex.schema.createTable('pessoas', table => {
    table.increments('id').primary()
    table.string('nome').notNull()
    table.string('login').notNull().unique()
    table.string('senha').notNull()
  })
};

exports.down = function(knex, Promise) {
  
};
