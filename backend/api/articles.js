const queries = require('./queries')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator

    const save = async (req, res) => {
        const article = {...req.body}
        if(req.params.id) article.id = req.params.id
    
        try {
            existsOrError(article.name, 'Nome do artigo não foi informado.')
            existsOrError(article.description, 'Descrição do artigo não informado')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.content, 'Conteúdo não informado')
            existsOrError(article.userId, 'Autor nao informado')

            const articleFromDB = await app.db('articles')
                .where({name: article.name}).first()
            if(!article.id){//Se user.id não estiver setado, não é um update
            notExistsOrError(articleFromDB, 'Artigo já cadastrado.')
            }
        }catch(msg){
            res.status(400).send(msg)
        }

        if(article.id){
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try{
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()
                try{
                    existsOrError(rowsDeleted, 'Artigo não foi encontrado')
                }catch(msg){
                    res.status(500).send(msg)
                }
            res.status(204).send()
        }catch(msg){
            res.status(400).send(msg)
        }
    }

    const limit = 10 //Limite de artigos por página - paginação
    const get = async (req, res) => {
        if(req.params.id){
            app.db('articles')
                .select('id', 'name', 'description', 'categoryId', 'content', 'imageUrl', 'userId')
                .where({ id: req.params.id }).first()
                .then(article =>{
                article.content = article.content.toString()
                res.json(article)
                })
                .catch(err => res.status(500).send(err))
            }else{
                const page = req.query.page || 1 //Se não estiver setado, exibe página 1
                const result = await app.db('articles').count('id').first()
                //count - número de artigos
                //limit - limite de artigos por página da paginação
                const count = parseInt(result.count)
        
                app.db('articles')
                    .select('id', 'name', 'description', 'categoryId','userId')
                    .limit(limit).offset(page * limit - limit) //offset - deslocamento dos dados
                    //ex: se limite 10 e a página é 1
                    //1 * 10 - 10, offset é 0
                    .then(articles => res.json({ data: articles, count, limit }))    
                    .catch(err => res.status(500).send(err))           
            }
    }

    const getByCategory = async (req, res) => { //consulta paginada 
        const categoryId = req.params.id
        const page = req.query.page || 1 // Se não informada é = 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({ a: 'articles', u: 'users'})//faz consulta em articles e users
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }
    return { save, remove, get, getByCategory }
}