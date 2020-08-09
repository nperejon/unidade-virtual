const config = require('../knexfile')
const knex = require('knex')(config)

knex.migrate.latest([config]) //config dentro de um array

module.exports = knex