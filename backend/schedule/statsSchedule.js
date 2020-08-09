const schedule = require('node-schedule')

 module.exports = app => {
     schedule.scheduleJob('*/1 * * * *', async function(){
         const usersCount = await app.db('users').count('id').first()
         const categoriesCount = await app.db('categories').count('id').first()
         const articlesCount = await app.db('articles').count('id').first()
         const challengesCount = await app.db('challenges').count('id').first()

         const { Stat } = app.api.stats

         const lastStat = await Stat.findOne({}, {},
            { sort: {'createdAt' : -1 }})

            const stat = new Stat({
                users: usersCount.count,
                categories: categoriesCount.count,
                articles: articlesCount.count,
                challenges: challengesCount.count,
                createdAt: new Date()
            })

            const changeUsers = !lastStat || stat.users !== lastStat.users
            //Se a lastStat não tiver sido setada ou se o stat for diferente da lastStat
            const changeCategories = !lastStat ||stat.categories !== lastStat.categories
            const changeArticles = !lastStat || stat.articles !== lastStat.articles
            const changeChallenges = !lastStat || stat.challenges !== lastStat.challenges
     
            if(changeUsers || changeCategories || changeArticles || changeChallenges) {
                stat.save()
                    .then(() => console.log('[Stats] Estatísticas atualizadas!'))
            }
    }) 
 }