export default defineNuxtRouteMiddleware((to, _) => {
  if (to.path === '/repos') {
    return navigateTo('/')
  }
})
