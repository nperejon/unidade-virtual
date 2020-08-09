const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, verifySpace } = app.api.validator

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10) //10 - quantidade de repetições
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = {...req.body}
        //Envia json que representa o json
        //Interceptado pelo body-parser
        //Pega o body pelo spread

        if(req.params.id) user.id = req.params.id
        //Se passar o id EM PARÂMETRO, é encarado como um update do usuário
        //Assim, seta o user.id como o id passado na url

        if(!req.originalUrl.startsWith('/users')) user.admin = 0 //Se não começar com /users, seta user.admin = 0
        if(!req.user || req.user.admin < 1) user.admin = 0

        try{
            existsOrError(user.name, 'Nome não informado.')
            verifySpace(user.name, 'Não pode haver espaços em seu nome.')
            existsOrError(user.secondname, 'É necessário inserir um sobrenome.')
            verifySpace(user.secondname, 'Não pode haver espaços em seu sobrenome.')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.nomeunidade, 'Nome da unidade não informado.')
            verifySpace(user.email, 'Não pode haver espaços em seu email.')
            existsOrError(user.password, 'Senha não informada')
            verifySpace(user.password, 'Não pode haver espaços em sua senha.')
            existsOrError(user.confirmPassword, 'Confirmação de senha incorreta.')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não são coincidentes')
            const userFromDB = await app.db('users')
                .where({email: user.email}).first()
            if(!user.id){//Se user.id não estiver setado, não é um update
                notExistsOrError(userFromDB, 'Usuário já cadastrado.')
            }
            const unidadeFromDB = await app.db('users')
                .where({nomeunidade: user.nomeunidade}).first()
            if(!user.id){//Se user.id não estiver setado, não é um update
                notExistsOrError(unidadeFromDB, 'Nome de unidade já cadastrado.')
            }
        }catch(msg){   
            //Erro em qualquer uma das validações joga pro catch
            return res.status(400).send(msg)
            //Erro no lado do cliente
        }

        user.password = encryptPassword(user.password) //encripta a senha e salva no objeto do usuário
        delete user.confirmPassword //deleta a confirmação de senha, pois não é necessário

        if(user.id){ //trata-se de um update do usuário dentro do banco de users
            app.db('users')
                .update(user)
                .where({id: user.id}) //procura pelo id de user.id
                .whereNull('deletedAt') //Se não for removido
                .then(_ => res.status(204).send()) //Se tudo der certo, envia 204, uma mensagem de sucesso.
                .catch(err => res.status(500).send(err))
        }else{//caso não trate de um update de usuário, será um cadastro
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) =>{
        //Obtém todos os usuários
        if(!req.params.id){
            app.db('users')
            .select('id', 'name', 'secondname', 'clube', 'nomeunidade', 'email', 'admin', 'lideranca', 'experiencia', 'gestaodegrupo', 'desafiosresolvidos', 'artedeacampar', 'habilidades')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
        }else{
            app.db('users')
            .select('id', 'name', 'secondname', 'clube', 'nomeunidade', 'email', 'admin', 'lideranca', 'experiencia', 'gestaodegrupo', 'desafiosresolvidos', 'artedeacampar', 'habilidades')
            .where({ id: req.params.id}).first()
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try{
            const articles = await app.db('articles')
            .where({ userId: req.params.id })
            notExistsOrError(articles, "Esse usuário contém artigos relacionados ao seu nome.")

            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, "Usuário não encontrado")

            res.status(204).send()
        }catch(msg){
            res.status(400).send(msg)
        }
    }
    return { save, get, remove }
}

//parâmetro app
