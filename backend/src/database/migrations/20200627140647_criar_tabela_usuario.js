exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.integer('id', 11).primary();
    table.string('name', 100).notNullable();
    table.string('email', 50).notNullable();
    table.string('username', 30).unique().notNullable();
    table.string('password', 255).notNullable();
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
