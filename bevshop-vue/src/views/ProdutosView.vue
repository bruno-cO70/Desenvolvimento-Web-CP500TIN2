<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { produtos as todosOsProdutos } from '@/data/produtos'
import type { FiltroCategoria, OrdenacaoTipo, Produto } from '@/types'
import ProductCard from '@/components/ProductCard.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import { useSmartSearch } from '@/composables/useSmartSearch'

const route = useRoute()

const termoBusca = ref('')
const ordenacao = ref<OrdenacaoTipo>('relevancia')
const precoMin = ref<number>(0)
const precoMax = ref<number | null>(null)
const categoriasAtivas = ref<FiltroCategoria[]>(['vinho', 'destilados', 'cerveja', 'sem-alcool'])
const produtoSelecionado = ref<Produto | null>(null)
const mostrarSugestoesBusca = ref(false)

const { rankProducts, getSuggestions } = useSmartSearch()

const categorias: { value: FiltroCategoria; label: string }[] = [
  { value: 'vinho', label: 'Vinhos' },
  { value: 'destilados', label: 'Destilados' },
  { value: 'cerveja', label: 'Cervejas' },
  { value: 'sem-alcool', label: 'Sem Álcool' },
]

onMounted(() => {
  const busca = route.query.busca as string
  if (busca) termoBusca.value = busca
})

watch(() => route.query.busca, (val) => {
  termoBusca.value = val ? (val as string) : ''
})

const produtosFiltrados = computed(() => {
  const listaBase = todosOsProdutos.filter(p => {
    const matchCategoria = categoriasAtivas.value.includes(p.categoria)
    const matchPreco = p.preco >= precoMin.value && (precoMax.value === null || p.preco <= precoMax.value)
    return matchCategoria && matchPreco
  })

  const termo = termoBusca.value.trim()
  let lista = termo ? rankProducts(listaBase, termo).map(item => item.produto) : listaBase

  if (ordenacao.value === 'menor') lista = [...lista].sort((a, b) => a.preco - b.preco)
  if (ordenacao.value === 'maior') lista = [...lista].sort((a, b) => b.preco - a.preco)

  return lista
})

const sugestoesBusca = computed(() => getSuggestions(todosOsProdutos, termoBusca.value, 5))

function aplicarSugestaoBusca(nomeProduto: string) {
  termoBusca.value = nomeProduto
  mostrarSugestoesBusca.value = false
}

function lidarBlurBusca() {
  window.setTimeout(() => {
    mostrarSugestoesBusca.value = false
  }, 100)
}

function toggleCategoria(cat: FiltroCategoria) {
  const idx = categoriasAtivas.value.indexOf(cat)
  if (idx >= 0) {
    categoriasAtivas.value.splice(idx, 1)
  } else {
    categoriasAtivas.value.push(cat)
  }
}

function abrirDetalhes(produto: Produto) {
  produtoSelecionado.value = produto
}

function fecharDetalhes() {
  produtoSelecionado.value = null
}
</script>

<template>
  <main class="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-slate-100 mb-8">Todos os Produtos</h1>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filtros Sidebar -->
      <aside class="w-full lg:w-64 flex-shrink-0">
        <div class="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-24">
          <h3 class="text-white font-bold text-lg mb-4">Filtros</h3>

          <div class="mb-6">
            <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Categorias</p>
            <div class="flex flex-col gap-2">
              <label
                v-for="cat in categorias"
                :key="cat.value"
                class="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  :checked="categoriasAtivas.includes(cat.value)"
                  class="w-4 h-4 accent-[#d4af37] rounded"
                  @change="toggleCategoria(cat.value)"
                />
                <span class="text-slate-300 text-sm group-hover:text-white transition-colors">{{ cat.label }}</span>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Preço</p>
            <div class="flex gap-2">
              <input
                v-model.number="precoMin"
                type="number"
                placeholder="Mín"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-[#d4af37]"
              />
              <input
                v-model.number="precoMax"
                type="number"
                placeholder="Máx"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Ordenar por</p>
            <select
              v-model="ordenacao"
              class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-[#d4af37]"
            >
              <option value="relevancia">Relevância</option>
              <option value="menor">Menor Preço</option>
              <option value="maior">Maior Preço</option>
            </select>
          </div>
        </div>
      </aside>

      <!-- Grid de Produtos -->
      <div class="flex-1">
        <div class="flex items-center justify-start gap-4 mb-6">
          <div class="relative hidden sm:block">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input
              v-model="termoBusca"
              type="search"
              placeholder="Buscar com IA local..."
              @focus="mostrarSugestoesBusca = true"
              @blur="lidarBlurBusca"
              class="bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-slate-100 text-sm focus:outline-none focus:border-[#d4af37] w-72"
            />

            <div
              v-if="mostrarSugestoesBusca && sugestoesBusca.length > 0"
              class="absolute top-full mt-2 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.35)] overflow-hidden z-30"
            >
              <button
                v-for="sugestao in sugestoesBusca"
                :key="sugestao.id"
                type="button"
                class="w-full px-3 py-2 text-left hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-b-0"
                @mousedown.prevent="aplicarSugestaoBusca(sugestao.nome)"
              >
                <p class="text-xs text-slate-100 truncate">{{ sugestao.nome }}</p>
                <p class="text-[10px] text-slate-400 uppercase tracking-wider mt-1">{{ sugestao.label }}</p>
              </button>
            </div>
          </div>
          <p class="text-slate-400 text-sm">
            Mostrando <span class="font-bold text-slate-100">{{ produtosFiltrados.length }}</span> de {{ todosOsProdutos.length }} produtos
          </p>
        </div>

        <div v-if="produtosFiltrados.length === 0" class="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
          <span class="material-symbols-outlined text-4xl">sentiment_dissatisfied</span>
          <p>Nenhum produto encontrado.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            v-for="produto in produtosFiltrados"
            :key="produto.id"
            :produto="produto"
            @open-details="abrirDetalhes"
          />
        </div>
      </div>
    </div>

    <ProductDetailModal
      v-if="produtoSelecionado"
      :produto="produtoSelecionado"
      @close="fecharDetalhes"
    />
  </main>

  <footer class="border-t border-slate-800 mt-12 py-8 text-center text-slate-500 text-sm">
    <p>© 2026 Bebidas Premium. Site desenvolvido para a disciplina Desenvolvimento Web em 2026.</p>
  </footer>
</template>