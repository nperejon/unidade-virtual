// Update with your config settings.
const { db } = require('./.env')

module.exports = {
    client: 'postgresql',
    connection: {
      database: db.database,
      user: 'postgres',
      password: db.password,
      port: db.port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
