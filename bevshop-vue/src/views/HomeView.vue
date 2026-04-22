<script setup lang="ts">
import { ref } from 'vue'
import { useCarrinhoStore } from '@/stores/carrinho'
import { useAuthStore } from '@/stores/auth'
import { useFormatters } from '@/composables/useFormatters'
import type { Produto } from '@/types'
import ProductCard from '@/components/ProductCard.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import { produtos } from '@/data/produtos'

const carrinho = useCarrinhoStore()
const authStore = useAuthStore()
const { formatarPreco } = useFormatters()
const produtoSelecionado = ref<Produto | null>(null)

const maisVendidos = produtos.filter(p =>
  [6, 1, 2, 11, 7, 22, 16, 25].includes(p.id)
)

const heroProduct = produtos.find(p => p.id === 24)!

function abrirDetalhes(produto: Produto) {
  produtoSelecionado.value = produto
}

function fecharDetalhes() {
  produtoSelecionado.value = null
}
</script>

<template>
  <main class="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col gap-16">

    <div v-if="authStore.usuario" class="bg-gradient-to-r from-slate-800 to-[#101922] border border-slate-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div class="flex items-center gap-5">
        <div class="size-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-3xl text-[#d4af37]">waving_hand</span>
        </div>
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-1">
            Olá, <span class="text-[#d4af37]">{{ authStore.usuario.user_metadata?.nome?.split(' ')[0] || 'Visitante' }}</span>! 🥂
          </h2>
          <p class="text-slate-400 text-sm md:text-base">Que bom ter você de volta à sua área premium de bebidas.</p>
        </div>
      </div>
      
      <div class="flex gap-3 w-full md:w-auto">
        <RouterLink to="/pedidos" class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-5 py-3 rounded-xl font-bold transition-colors">
          <span class="material-symbols-outlined text-[20px]">receipt_long</span> Meus Pedidos
        </RouterLink>
      </div>
    </div>
    <section class="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl flex flex-col lg:flex-row items-center">
      <div class="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col gap-6">
        <div class="flex items-center gap-3">
          <span class="h-[2px] w-8 bg-[#d4af37]" />
          <span class="text-[#d4af37] font-bold tracking-widest uppercase text-xs">Lançamento Exclusivo</span>
        </div>
        <h1 class="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
          Cognac XO <br /><span class="text-[#d4af37] font-light italic">Imperial</span>
        </h1>
        <p class="text-slate-300 text-lg leading-relaxed max-w-md">
          Uma obra-prima envelhecida. Notas intensas de carvalho tostado, baunilha e frutas secas. Para os momentos que exigem o melhor.
        </p>
        <div class="flex items-baseline gap-4 mt-2">
          <span class="text-4xl font-bold text-white">{{ formatarPreco(450) }}</span>
          <span class="text-slate-400 line-through mb-1">{{ formatarPreco(580) }}</span>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            class="flex-1 flex items-center justify-center gap-2 h-14 px-8 bg-[#d4af37] hover:bg-[#d4af37]/90 transition-all text-slate-900 text-base font-bold rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1"
            @click="carrinho.adicionar(heroProduct)"
          >
            <span class="material-symbols-outlined">shopping_cart_checkout</span>
            Comprar Agora
          </button>
          <RouterLink
            to="/produtos"
            class="flex-1 flex items-center justify-center h-14 px-8 border border-slate-600 hover:border-[#d4af37] hover:text-[#d4af37] transition-all text-white bg-transparent text-base font-bold rounded-xl"
          >
            Ver Coleção
          </RouterLink>
        </div>
      </div>
      <div
        class="w-full lg:w-1/2 h-[400px] lg:h-[600px] bg-cover bg-center"
        :style="{ backgroundImage: `url('${heroProduct.img}')` }"
      />
    </section>

    <section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-slate-100 text-3xl font-bold leading-tight tracking-tight">Nossas Categorias</h2>
        <RouterLink to="/produtos" class="text-[#d4af37] hover:text-[#d4af37]/80 text-sm font-bold flex items-center transition-colors uppercase tracking-wider">
          Ver Tudo <span class="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <RouterLink
          v-for="cat in [
           { label: 'Vinhos', icon: 'wine_bar', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop' },
           { label: 'Cervejas', icon: 'sports_bar', img: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=600&auto=format&fit=crop' },
           { label: 'Destilados', icon: 'local_drink', img: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=600&auto=format&fit=crop' },
            { label: 'Sem Álcool', icon: 'water_drop', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop' },
          ]"
          :key="cat.label"
          to="/produtos"
          class="group relative h-48 sm:h-64 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800"
        >
          <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" :style="{ backgroundImage: `url('${cat.img}')` }" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent group-hover:from-slate-900/90 transition-all" />
          <div class="relative z-10 flex flex-col items-center mt-12">
            <span class="material-symbols-outlined text-[40px] text-[#d4af37] mb-2 group-hover:-translate-y-2 transition-transform duration-300">{{ cat.icon }}</span>
            <h3 class="text-white text-lg sm:text-xl font-bold">{{ cat.label }}</h3>
          </div>
        </RouterLink>
      </div>
    </section>

    <section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-slate-100 text-3xl font-bold leading-tight tracking-tight">Mais Vendidos</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="p in maisVendidos" :key="p.id" @click="abrirDetalhes(p)" class="cursor-pointer">
          <ProductCard :produto="p" />
        </div>
      </div>
    </section>
  </main>

  <ProductDetailModal
    v-if="produtoSelecionado"
    :produto="produtoSelecionado"
    @close="fecharDetalhes"
  />

  <footer class="border-t border-slate-800 mt-12 py-8 text-center text-slate-500 text-sm">
    <p>© 2026 Bebidas Premium. Site desenvolvido para a disciplina Desenvolvimento Web em 2026.</p>
  </footer>
</template>