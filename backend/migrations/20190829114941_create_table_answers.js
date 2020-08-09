
exports.up = function(knex, Promise) {
    return knex.schema.createTable('answers', table =>{
        table.increments('id').primary()
        table.string('text').notNull()
        table.integer('answerNumber').notNull()
        table.integer('status').notNull().defaultTo(0)
        table.integer('userId').references('id')
        .inTable('users').notNull()
        table.integer('challengeId').references('id')
          .inTable('challenges').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('answers')
};
