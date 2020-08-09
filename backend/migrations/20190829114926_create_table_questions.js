
exports.up = function(knex, Promise) {
    return knex.schema.createTable('questions', table =>{
        table.increments('id').primary()
        table.string('text').notNull()
        table.integer('questionNumber').notNull()
        table.integer('challengeId').references('id')
          .inTable('challenges').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questions')
};
