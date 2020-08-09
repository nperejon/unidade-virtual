module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator

    const save = (req, res) =>{ //segue padrão incluir categoria ou dar update em categoria
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }
        if(req.params.id) category.id = req.params.id
        //Se for encaminhado algum id pela url será colocado dentro do objeto e encarado como uma alteração da categoria

        try{ //validações
            existsOrError(category.name, 'Nome não informado.')
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(category.id){ //Faz a alteração/update dentro de categoria tendo o id fornecido pela url
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))//500 - dentro do servidor // err sendo enviado
        }else{//encara como não setado na url e faz uma inclusão no db
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) =>{
        try{
            existsOrError(req.params.id, 'Código da categoria não informado') //verifica se há o parâmetro id de categoria

            const subcategory = await app.db('categories') //verifica se a categoria é pai de outras categorias
                .where({ parentId: req.params.id}) //parentId é igual ao id recebido da categoria
            notExistsOrError(subcategory, 'Há subcategorias vinculadas a essa categoria') //Não pode existir subcategorias
        
            const articles = await app.db('articles') //verifica se a categoria é pai de artigos
                .where({ categoryId: req.params.id})
            notExistsOrError(articles, 'Há artigos vinculados a essa categoria')

            const rowsDeleted = await app.db('categories') //verifica se a categoria existe pelo id
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'A categoria não foi encontrada')

            res.status(204).send()
        }catch(msg){
            res.status(400).send(msg)
        }
    }

    const withPath = categories => { //com caminho
        //recebe lista de categorias e retorna novamente uma lista de categorias
        const getParent = (categories, parentId) => { //pega categoria pai de cada categoria
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
            //se > 0 retorna 1 parent
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId) //envia novamente o array de categorias com o parentId da categoria iniciada
            //retorna getParent() para let parent

            while(parent) { //enquanto houver pai
                path = `${parent.name} > ${path}`
                //o path se torna uma string com 'Categoria A > Categoria B' se houver pai em outras vezes
                parent = getParent(categories, parent.parentId)
                //Pega o pai da categoria pai para fazer novamente o path
                //Aqui se encontra o X da questão, onde o parent chama novamente o getParent() fazendo o ciclo
            }

            return { ...category, path }
        })

        categoriesWithPath.sort((a, b) => { //Verifica a ordem alfabética
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    const get = (req, res) => {
        if(!req.params.id){
            app.db('categories')
                .then(categories => res.json(withPath(categories)))
                .catch(err => res.status(500).send(err))
        }else{
            app.db('categories')
                .where({ id: req.params.id }).first()
                .then(category => res.json(category)) //Não traz o path, sendo que é preciso uma array com todas as categorias para fazer o mesmo
                .catch(err => { res.status(500).send(err) })
        }
    }

    const toTree = (categories, tree) =>{
        if(!tree) tree = categories.filter(semParent => !semParent.parentId)
        //Se não há tree, seta tree como sem pai sendo true
        //Faz uma array com todos os sem pai
        tree = tree.map(parentNode => {
        /**
         * Na primeira vez uma array com o tree sem pai dando o children
         * para cada objeto que passa pelo map
         * passando pela função toTree verificando como parâmetro segundo
         * se em array categories é filho do mesmo com isChild formando um array
         * Verificando se é filho, passa como tree buscando outros filhos
         * fazendo os galhos
         * Se não houver mais filhos, parte para outro elemento dentro de categories
         * fazendo outro ramo da árvore
         **/
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode //já com o atributo children setado
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')//seleciona todos os campos da tabela
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getTree }
}