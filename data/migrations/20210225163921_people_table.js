
exports.up = function(knex) {
    return knex.schema.createTable('people', table => {
        table.increments()
        table.string('name', 160).unique().notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('people')
};
