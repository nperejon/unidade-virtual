
exports.up = function(knex, Promise) {
    return knex.schema.createTable('challenges', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.string('description', 1000).notNull()
        table.string('imageUrl', 1000)
        table.integer('status').notNull().defaultTo(0)
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('challenges')
};
