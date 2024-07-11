export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/repos") {
    return navigateTo("/")
  }
})
