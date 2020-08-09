module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator

    const save = async (req, res) => {
        const challenge = { ...req.body }
        const questions = new Array()

        if(req.params.id) challenge.id = req.params.id

        Object.keys(challenge).forEach(n => {
            if(n.startsWith('question_')){
                const indices = []
                indices.push(Object.keys(challenge).indexOf(n))
                Object.values(challenge).forEach((c, i) => {
                    if(indices.includes(i)){
                        questions.push(c)
                    }
                })
            }
        })
        
        try{
            existsOrError(challenge.name, 'É necessário um nome para o desafio.')
            existsOrError(challenge.description, 'É necessário uma descrição para o desafio')
            existsOrError(challenge.userId, 'Autor não informado')
            existsOrError(questions, 'Não há questões para serem respondidas')
        }catch(msg){
            res.status(400).send(msg)
        }

        if(challenge.id){
            app.db('challenges')
                .update({
                    name: challenge.name,
                    description: challenge.description,
                    userId: challenge.userId
                })
                .where({ id: req.params.id })
                .then()                
                .catch(err => res.status(500).send(err))

                const questionsToInsert = questions.map((n, i) => ({text: n, questionNumber: i + 1, challengeId: id[0]}))
                    app.db('questions')
                    .where({ challengeId: challenge.id })
                    .del()
                    .then(criarNovasPerguntas())

                    function criarNovasPerguntas(){
                        app.db('questions')
                        .insert(questionsToInsert)
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(500).send(err))
                    }
        }else{
            app.db('challenges')
                .insert({
                    name: challenge.name,
                    description: challenge.description,
                    userId: challenge.userId
                })
                .returning('id')
                .then(id => {
                    fazerPerguntas(id)
                })
                .catch(err => res.status(500).send(err))
                
                function fazerPerguntas(id){
                    const questionsToInsert = questions.map((n, i) => ({text: n, questionNumber: i + 1, challengeId: id[0]}))
                    app.db('questions')
                    .insert(questionsToInsert)
                    .then(_ => res.status(204).send())
                }
        }
    }

    const get = (req, res) => {
        if(req.params.id){
            app.db({ c: 'challenges', u: 'users'})
            .select('c.id', 'c.name', 'c.description', 'c.status', { author: 'u.name' })
            .whereRaw('?? = ??', ['u.id', 'c.userId'])
            .where({ 'c.id': req.params.id })
            .then(challenge => retornarComQuestao(challenge))

            function retornarComQuestao(challenge){
                app.db('questions')
                .select('text', 'questionNumber')
                .where({ challengeId: req.params.id })
                .then(questions => res.json({ info: challenge[0], questions: questions }) )
            }
        }else{
            app.db({ c: 'challenges', u: 'users'})
            .select('c.id', 'c.name', 'c.description', 'c.status', { author: 'u.name' })
            .whereRaw('?? = ??', ['u.id', 'c.userId'])
            .then(challenge => res.json(challenge))
        }
    }

    const remove = (req, res) => {
        app.db('questions')
        .where({ challengeId: req.params.id })
        .del()
        .returning('challengeId')
        .then(deletarDesafio())

        function deletarDesafio(){
            console.log(req.params.id)
            app.db('challenges')
            .where({ id: req.params.id })
            .del()
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }

        
    }

    return { save, get, remove }
}