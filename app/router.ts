import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', component: () => import('./pages/index.vue') },
    { path: '/repos', redirect: '/' },
    { path: '/repos/:repo', component: () => import('./pages/repos/[repo]/index.vue') },
    { path: '/repos/:repo/:package([^@]+)@:version', component: () => import('./pages/repos/[repo]/[package]@[version].vue') },
    { path: '/docs/:slug(.*)*', component: () => import('./pages/docs/[...slug].vue'), meta: { layout: 'docs' } },
    { path: '/status', component: () => import('./pages/status/index.vue'), meta: { layout: 'sync-status', robots: 'noindex, nofollow' } },
    { path: '/status/tasks', component: () => import('./pages/status/tasks/index.vue'), meta: { layout: 'sync-status', robots: 'noindex, nofollow' } },
    { path: '/status/tasks/:id', component: () => import('./pages/status/tasks/[id].vue'), meta: { layout: 'sync-status', robots: 'noindex, nofollow' } },
    { path: '/status/repos/:repo', component: () => import('./pages/status/repos/[repo].vue'), meta: { layout: 'sync-status', robots: 'noindex, nofollow' } },
    { path: '/status/ros', component: () => import('./pages/status/ros.vue'), meta: { layout: 'empty' } },
    { path: '/status/api', component: () => import('./pages/status/api.vue'), meta: { layout: 'empty' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
