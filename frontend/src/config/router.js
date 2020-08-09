import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import Challenges from '@/components/challenge/Challenges'
import ArticleById from '@/components/article/ArticleById'
import ChallengeById from '@/components/challenge/ChallengeById'
import Auth from '@/components/auth/Auth'
import Perfil from '@/components/perfil/Perfil'
import AvaliarDesafios from '@/components/challenge/ChallengesAvaliar'
import ChallengeReadyUsers from '@/components/challenge/ChallengeReadyUsers'
import AvaliarUser from '@/components/challenge/AnswersByUsers'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'articlesByCategory',
    path: '/categorias/:id/artigos',
    component: ArticlesByCategory
}, {
    name: 'challenges',
    path: '/desafios/',
    component: Challenges
}, {
    name: 'articleById',
    path: '/artigos/:id',
    component: ArticleById
}, {
    name: 'challengeById',
    path: '/desafios/:id',
    component: ChallengeById
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'perfil',
    path: '/perfil/:id',
    component: Perfil
}, {
    name: 'avaliardesafios',
    path: '/avaliardesafios',
    component: AvaliarDesafios
}, {
    name: 'challengeReadyUsers',
    path: '/avaliardesafios/:id',
    component: ChallengeReadyUsers
}, {
    name: 'avaliarUser',
    path: '/avaliar/user/:userid/desafio/:id',
    component: AvaliarUser
}, ]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin > 0 ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
