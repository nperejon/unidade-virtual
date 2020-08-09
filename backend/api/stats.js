module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        challenges: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt' : - 1}}) // ao invés de app.db
        //Busca {}- filtro | {}- seleciona atributos | {} - pega a última stats cadastrada no mongo db de forma decrescente
            .then(stat => {
                const defaultStats = {
                    users: 0,
                    categories: 0,
                    articles: 0,
                    challenges: 0,
                    createdAt: 0
                }
                res.json(stat || defaultStats)
            })
    }

    return { Stat, get }
}