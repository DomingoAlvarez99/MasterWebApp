import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            redirect: '/',
        },
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue'),
            meta: {
                title: 'Home'
            }
        },
        {
            path: '/players',
            name: 'players',
            component: () => import('../views/PlayersView.vue'),
            meta: {
                title: 'Players'
            }
        },
        {
            path: '/players/player/:name',
            name: 'player',
            component: () => import('../views/PlayerView.vue'),
            meta: {
                title: 'Player'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name == 'player') {
        document.title = to.params.name
    } else {
        document.title = to.meta.title
    }
    next()
})

export default router
