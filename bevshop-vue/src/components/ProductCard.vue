<script setup lang="ts">
import type { Produto } from '@/types'
import { useCarrinhoStore } from '@/stores/carrinho'
import { useFormatters } from '@/composables/useFormatters'

defineProps<{ produto: Produto }>()

const carrinho = useCarrinhoStore()
const { formatarPreco } = useFormatters()
</script>

<template>
  <div class="group flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-600 transition-colors duration-300 p-4">
    <div class="w-full aspect-[4/5] bg-slate-800/50 rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
      <span
        v-if="produto.tag"
        class="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10 text-white"
        :class="produto.tag === 'Promoção' ? 'bg-red-500' : 'bg-[#d4af37] text-slate-900'"
      >{{ produto.tag }}</span>
      <img
        :src="produto.img"
        :alt="produto.nome"
        class="h-full object-contain group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    <div class="flex flex-col grow">
      <p class="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">{{ produto.label }}</p>
      <h4 class="text-slate-100 font-bold text-base leading-tight mb-3">{{ produto.nome }}</h4>
      <div class="mt-auto flex items-center justify-between">
        <div class="flex flex-col">
          <span v-if="produto.precoAntigo" class="text-xs text-slate-500 line-through">{{ formatarPreco(produto.precoAntigo) }}</span>
          <p class="text-[#d4af37] font-bold text-xl">{{ formatarPreco(produto.preco) }}</p>
        </div>
        <button
          class="w-10 h-10 rounded-lg bg-slate-800 hover:bg-[#d4af37] text-white hover:text-slate-900 flex items-center justify-center transition-colors"
          @click="carrinho.adicionar(produto)"
        >
          <span class="material-symbols-outlined">add_shopping_cart</span>
        </button>
      </div>
    </div>
  </div>
</template>