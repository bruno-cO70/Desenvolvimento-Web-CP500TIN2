import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue') },
    { path: '/produtos', name: 'produtos', component: () => import('@/views/ProdutosView.vue') },
    { path: '/pagamento', component: () => import('@/views/PagamentoView.vue') },
    { path: '/pedidos', component: () => import('@/views/PedidosView.vue') },
    { path: '/login', component: () => import('@/views/LoginView.vue') },
  ]
})
export default router