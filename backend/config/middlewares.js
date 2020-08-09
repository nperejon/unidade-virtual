const bodyParser = require('body-parser')
const cors = require('cors')

/**
 * App centralizar
 * Consign coloca a API dentro de app
 */

 module.exports = app => {
     app.use(bodyParser.json()) //aplica o middleware que executa o json no corpo da requisição
     app.use(cors())
 }