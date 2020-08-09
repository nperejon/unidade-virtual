
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('secondname').notNull()
      table.string('clube')
      table.string('nomeunidade').unique()
      table.string('email').notNull().unique()
      table.string('password').notNull()
      table.string('admin').notNull().defaultTo(0)
      table.string('imageUrl')
      table.string('habilidades').notNull().defaultTo(0)
      table.string('artedeacampar').notNull().defaultTo(0)
      table.string('lideranca').notNull().defaultTo(0)
      table.string('experiencia').notNull().defaultTo(0)
      table.string('gestaodegrupo').notNull().defaultTo(0)
      table.string('desafiosresolvidos').notNull().defaultTo(0)
      table.string('deletedAt')
    })
    //Não esquecer do return
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('users')
  };
  
  //down faz o oposto de uo