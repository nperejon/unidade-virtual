const admin = require('./admin')
const diretoria = require('./diretoria')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save)) //caminho consign para salvar o usuário quando post
        .get(admin(app.api.user.get)) //caminho consign para obter usuário quando get
        //consign carrega os arquivos 
        //requisição na url /users usa método do http post

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save)) //caminho consign para alterar o usuário quando fornecido o id em parâmetro
        .get(app.api.user.get)
        .delete(admin(app.api.user.remove))

    app.route('/categorias')
        .all(app.config.passport.authenticate())    
        .post(diretoria(app.api.category.save))
        .get(admin(app.api.category.get))

    app.route('/categorias/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    //urls genéricas em baixo
    app.route('/categorias/:id')
        .all(app.config.passport.authenticate())
        .put(diretoria(app.api.category.save))
        .get(app.api.category.get)
        .delete(diretoria(app.api.category.remove))

    app.route('/artigos/')
        .all(app.config.passport.authenticate())
        .post(diretoria(app.api.articles.save))
        .get(admin(app.api.articles.get))

    app.route('/artigos/:id')
        .all(app.config.passport.authenticate())
        .put(diretoria(app.api.articles.save))
        .get(app.api.articles.get)
        .delete(diretoria(app.api.articles.remove))

    app.route('/categorias/:id/artigos')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stats.get)

    app.route('/responder/desafio/:id')
        .all(app.config.passport.authenticate())
        .post(app.api.answers.save)

    app.route('/user/:user/desafio/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.answers.get)

    app.route('/desafios')
        .all(app.config.passport.authenticate())
        .post(diretoria(app.api.challenges.save))
        .get(app.api.challenges.get)

    app.route('/desafios/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.challenges.get)
        .put(diretoria(app.api.challenges.save))
        .delete(admin(app.api.challenges.remove))
}