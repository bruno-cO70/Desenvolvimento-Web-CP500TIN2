<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCarrinhoStore } from '@/stores/carrinho'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const carrinhoStore = useCarrinhoStore()
const authStore = useAuthStore()

const menuAberto = ref(false)
const termoBusca = ref('')

function toggleMenu() {
  // Se não estiver logado, manda pro login
  if (!authStore.usuario) {
    router.push('/login')
    return
  }
  // Se estiver logado, abre/fecha o mini dashboard
  menuAberto.value = !menuAberto.value
}

function buscar() {
  if (!termoBusca.value.trim()) return
  router.push({ name: 'produtos', query: { busca: termoBusca.value.trim() } })
}

async function sair() {
  await authStore.logout()
  menuAberto.value = false
  router.push('/login')
}
</script>

<template>
  <header class="flex items-center justify-between whitespace-nowrap border-b border-slate-800/60 px-6 lg:px-10 py-3 sticky top-0 bg-[#101922]/95 backdrop-blur-md z-50">
    <div class="flex items-center gap-6 lg:gap-8 flex-1">
      <RouterLink to="/" class="flex items-center gap-3 text-slate-100">
        <span class="material-symbols-outlined text-[28px] text-[#d4af37]">local_bar</span>
        <h2 class="text-slate-100 text-xl font-bold leading-tight tracking-tight">BevShop</h2>
      </RouterLink>

      <form class="hidden sm:flex flex-col h-10 w-full max-w-sm" @submit.prevent="buscar">
        <div class="flex w-full flex-1 items-stretch rounded-full h-full bg-slate-800/80 border border-slate-700/50 hover:border-[#d4af37]/50 transition-colors">
          <div class="text-slate-400 flex items-center justify-center pl-4 pr-2">
            <span class="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            v-model="termoBusca"
            type="search"
            autocomplete="off"
            class="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-full text-slate-100 focus:outline-none border-none bg-transparent h-full placeholder:text-slate-400 px-2 text-sm font-normal"
            placeholder="Buscar bebidas premium..."
          />
        </div>
      </form>
    </div>

    <div class="flex items-center justify-end gap-6 lg:gap-8">
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink to="/" class="text-slate-300 hover:text-[#d4af37] transition-colors text-sm font-medium" active-class="text-[#d4af37] font-bold">Início</RouterLink>
        <RouterLink to="/produtos" class="text-slate-300 hover:text-[#d4af37] transition-colors text-sm font-medium" active-class="text-[#d4af37] font-bold">Produtos</RouterLink>
        <RouterLink to="/pagamento" class="text-slate-300 hover:text-[#d4af37] transition-colors text-sm font-medium" active-class="text-[#d4af37] font-bold">Pagamento</RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <button
          class="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700/50 transition-colors text-slate-100 relative"
          @click="carrinhoStore.aberto = true"
        >
          <span class="material-symbols-outlined text-[22px]">shopping_cart</span>
          <span
            v-if="carrinhoStore.totalItens > 0"
            class="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#d4af37] text-slate-900 text-[10px] font-bold"
          >{{ carrinhoStore.totalItens }}</span>
        </button>

        <div class="relative">
          <button
            class="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700/50 transition-colors text-slate-100 relative z-50"
            @click="toggleMenu"
          >
            <span
              class="material-symbols-outlined text-[22px]"
              :class="{ 'text-[#d4af37]': authStore.usuario }"
            >person</span>
            
            <span v-if="authStore.usuario" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#101922] rounded-full"></span>
          </button>

          <div
            v-if="menuAberto && authStore.usuario"
            class="absolute right-0 top-full mt-4 w-80 bg-[#1e293b] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700 flex flex-col z-[100] overflow-hidden"
          >
            <div class="p-6 border-b border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
              <div class="flex items-center gap-4 mb-4">
                <div class="size-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[#d4af37] text-2xl">person</span>
                </div>
                <div class="overflow-hidden">
                  <h3 class="font-bold text-white text-lg leading-tight truncate">
                    {{ authStore.usuario.user_metadata?.nome || authStore.usuario.raw_user_meta_data?.nome || 'Usuário VIP' }}
                  </h3>
                  <span class="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Conta Ativa</span>
                </div>
              </div>
              <p class="text-slate-400 text-sm flex items-center gap-2 truncate">
                <span class="material-symbols-outlined text-[16px] shrink-0">mail</span>
                {{ authStore.usuario.email }}
              </p>
            </div>
            
            <div class="p-3 bg-slate-800">
              <RouterLink
                to="/pedidos"
                class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-colors"
                @click="menuAberto = false"
              >
                <span class="material-symbols-outlined text-[20px] text-[#d4af37]">receipt_long</span> Histórico de Pedidos
              </RouterLink>
              
              <button
                class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors text-left mt-1"
                @click="sair"
              >
                <span class="material-symbols-outlined text-[20px]">logout</span> Sair da Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div v-if="menuAberto" class="fixed inset-0 z-40" @click="menuAberto = false" />
</template>