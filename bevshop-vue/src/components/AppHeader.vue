<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCarrinhoStore } from '@/stores/carrinho'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const carrinhoStore = useCarrinhoStore()
const authStore = useAuthStore()

const menuAberto = ref(false)
const menuMobileAberto = ref(false)
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
  menuMobileAberto.value = false
}

async function sair() {
  await authStore.logout()
  menuAberto.value = false
  router.push('/login')
}
</script>

<template>
  <header class="flex items-center justify-between whitespace-nowrap border-b border-slate-800/60 px-6 lg:px-10 py-3 sticky top-0 bg-[#101922]/95 backdrop-blur-md z-50">
    <div class="flex items-center gap-4 lg:gap-6 flex-1 min-w-0">
      <RouterLink to="/" class="flex items-center gap-3 text-slate-100 flex-shrink-0">
        <span class="material-symbols-outlined text-[28px] text-[#d4af37]">local_bar</span>
        <h2 class="text-slate-100 text-xl font-bold leading-tight tracking-tight">BevShop</h2>
      </RouterLink>

      <form class="hidden sm:flex flex-col h-12 flex-1 max-w-[240px] lg:max-w-[420px] transition-all duration-300" @submit.prevent="buscar">
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

    <div class="flex items-center justify-end gap-6 sm:gap-8 lg:gap-6 flex-shrink-0">
      <nav class="hidden md:flex items-center gap-6 lg:gap-8">
        <RouterLink to="/" class="text-slate-300 hover:text-[#d4af37] transition-colors text-sm font-medium" active-class="text-[#d4af37] font-bold">Início</RouterLink>
        <RouterLink to="/produtos" class="text-slate-300 hover:text-[#d4af37] transition-colors text-sm font-medium" active-class="text-[#d4af37] font-bold">Produtos</RouterLink>
        <RouterLink to="/pagamento" class="text-slate-300 hover:text-[#d4af37] transition-colors text-sm font-medium" active-class="text-[#d4af37] font-bold">Pagamento</RouterLink>
      </nav>

      <div class="flex items-center justify-end gap-2 lg:gap-4">
        <button
          class="md:hidden flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700/50 transition-colors text-slate-100"
          @click="menuMobileAberto = !menuMobileAberto"
        >
          <span class="material-symbols-outlined text-[22px]">menu</span>
        </button>

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

  <!-- Menu Mobile -->
  <transition
    enter-active-class="transition duration-200"
    leave-active-class="transition duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div v-if="menuMobileAberto" class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden" @click="menuMobileAberto = false" />
  </transition>

  <transition
    enter-active-class="transition duration-200 ease-out"
    leave-active-class="transition duration-200 ease-in"
    enter-from-class="-translate-x-full"
    leave-to-class="-translate-x-full"
  >
    <div
      v-if="menuMobileAberto"
      class="fixed left-0 top-0 h-full w-72 bg-[#1e293b] border-r border-slate-700 z-50 md:hidden flex flex-col"
    >
      <!-- Header do Menu Mobile -->
      <div class="border-b border-slate-700 p-4 flex items-center justify-between">
        <h3 class="text-slate-100 font-bold text-lg">Menu</h3>
        <button
          class="flex size-10 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-slate-100"
          @click="menuMobileAberto = false"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Conteúdo do Menu Mobile -->
      <div class="flex-1 overflow-y-auto">
        <nav class="flex flex-col p-4 gap-2">
          <RouterLink
            to="/"
            class="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-[#d4af37] rounded-lg transition-colors font-medium"
            active-class="bg-slate-800 text-[#d4af37] font-bold"
            @click="menuMobileAberto = false"
          >
            <span class="material-symbols-outlined text-[20px]">home</span>
            Início
          </RouterLink>

          <RouterLink
            to="/produtos"
            class="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-[#d4af37] rounded-lg transition-colors font-medium"
            active-class="bg-slate-800 text-[#d4af37] font-bold"
            @click="menuMobileAberto = false"
          >
            <span class="material-symbols-outlined text-[20px]">shopping_bag</span>
            Produtos
          </RouterLink>

          <RouterLink
            to="/pagamento"
            class="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-[#d4af37] rounded-lg transition-colors font-medium"
            active-class="bg-slate-800 text-[#d4af37] font-bold"
            @click="menuMobileAberto = false"
          >
            <span class="material-symbols-outlined text-[20px]">credit_card</span>
            Pagamento
          </RouterLink>

          <div v-if="authStore.usuario" class="my-2 border-t border-slate-700" />

          <RouterLink
            v-if="authStore.usuario"
            to="/pedidos"
            class="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-[#d4af37] rounded-lg transition-colors font-medium"
            active-class="bg-slate-800 text-[#d4af37] font-bold"
            @click="menuMobileAberto = false"
          >
            <span class="material-symbols-outlined text-[20px]">receipt_long</span>
            Meus Pedidos
          </RouterLink>
        </nav>
      </div>

      <!-- Footer do Menu Mobile -->
      <div v-if="authStore.usuario" class="border-t border-slate-700 p-4">
        <div class="flex items-center gap-3 mb-4 pb-4 border-b border-slate-700">
          <div class="size-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[#d4af37] text-lg">person</span>
          </div>
          <div class="overflow-hidden flex-1">
            <p class="text-white font-bold text-sm truncate">
              {{ authStore.usuario.user_metadata?.nome?.split(' ')[0] || 'Usuário' }}
            </p>
            <p class="text-[10px] text-[#d4af37] uppercase tracking-widest font-bold">VIP</p>
          </div>
        </div>
        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors text-left"
          @click="sair"
        >
          <span class="material-symbols-outlined text-[20px]">logout</span>
          Sair da Conta
        </button>
      </div>

      <div v-else class="border-t border-slate-700 p-4">
        <RouterLink
          to="/login"
          class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#d4af37] hover:bg-[#d4af37]/90 text-slate-900 font-bold rounded-lg transition-colors"
          @click="menuMobileAberto = false"
        >
          <span class="material-symbols-outlined">login</span>
          Entrar
        </RouterLink>
      </div>
    </div>
  </transition>
</template>