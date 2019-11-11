
exports.up = function(knex) {
  return knex.schema.createTable('authorization', table => {
    table
      .increments();

    table
      .string('username', 128).notNullable();

    table
      .string('password', 128).notNullable();

    table
      .timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('authorization');
};
