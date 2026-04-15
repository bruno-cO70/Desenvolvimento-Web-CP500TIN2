<script setup lang="ts">
import { useCarrinhoStore } from '@/stores/carrinho'
import { useFormatters } from '@/composables/useFormatters'

const carrinho = useCarrinhoStore()
const { formatarPreco } = useFormatters()
</script>

<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div
      v-if="carrinho.aberto"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
      @click="carrinho.aberto = false"
    />
  </Transition>

  <!-- Sidebar -->
  <Transition name="slide">
    <div
      v-if="carrinho.aberto"
      class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#101922] shadow-[0_0_40px_rgba(0,0,0,0.5)] z-[70] flex flex-col border-l border-slate-800"
    >
      <div class="flex items-center justify-between p-6 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[#d4af37]">shopping_bag</span>
          <h2 class="text-xl font-bold text-white">Seu Carrinho</h2>
        </div>
        <button class="text-slate-400 hover:text-slate-100 transition-colors" @click="carrinho.aberto = false">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-thin">
        <div v-if="carrinho.itens.length === 0" class="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
          <span class="material-symbols-outlined text-5xl">remove_shopping_cart</span>
          <p>Seu carrinho está vazio.</p>
        </div>

        <div
          v-for="item in carrinho.itens"
          :key="item.id"
          class="flex gap-4 border-b border-slate-800 pb-4"
        >
          <div
            class="h-20 w-16 rounded-md bg-slate-800 bg-cover bg-center flex-shrink-0"
            :style="{ backgroundImage: `url('${item.img}')` }"
          />
          <div class="flex flex-col flex-1 justify-between">
            <div class="flex justify-between items-start">
              <h4 class="font-bold text-sm text-slate-100 leading-tight line-clamp-2 pr-4">{{ item.nome }}</h4>
              <button class="text-slate-400 hover:text-red-500 transition-colors" @click="carrinho.remover(item.id)">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center border border-slate-700 rounded bg-slate-900">
                <button class="w-7 h-7 flex items-center justify-center text-slate-400 hover:bg-slate-800 rounded-l transition-colors" @click="carrinho.alterarQuantidade(item.id, -1)">-</button>
                <span class="w-6 text-center text-xs font-bold text-white">{{ item.quantidade }}</span>
                <button class="w-7 h-7 flex items-center justify-center text-slate-400 hover:bg-slate-800 rounded-r transition-colors" @click="carrinho.alterarQuantidade(item.id, 1)">+</button>
              </div>
              <span class="font-bold text-[#137fec] text-sm">{{ formatarPreco(item.preco * item.quantidade) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 border-t border-slate-800 bg-slate-900/50">
        <div class="flex justify-between items-center mb-4">
          <span class="text-slate-400 font-medium">Subtotal</span>
          <span class="text-xl font-bold text-white">{{ formatarPreco(carrinho.subtotal) }}</span>
        </div>
        <RouterLink
          to="/pagamento"
          class="w-full flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#d4af37]/90 text-slate-900 rounded-xl h-14 font-bold transition-colors shadow-md"
          @click="carrinho.aberto = false"
        >
          Ir para o Pagamento <span class="material-symbols-outlined text-lg">arrow_forward</span>
        </RouterLink>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>