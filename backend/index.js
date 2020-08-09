const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
require('./config/mongodb')

app.db = db
app.mongoose = mongoose
//adiciona dentro de app o db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validator.js') //necessário ter o validator antes para rodar em user
    .then('./api') //todos dentro da api
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)
    //Injeta dentro de app o que foi carregado dentro de middlewares
    //Uma função

app.listen(3000, () => {
    console.log('Backend executado com sucesso...')
})