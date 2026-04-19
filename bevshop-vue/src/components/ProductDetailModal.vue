<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import type { Produto } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import { useCarrinhoStore } from '@/stores/carrinho'

const props = defineProps<{
  produto: Produto
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const { formatarPreco } = useFormatters()
const carrinho = useCarrinhoStore()

const descricaoProduto = computed(() => {
  if (props.produto.descricao) return props.produto.descricao
  return `Bebida premium da categoria ${props.produto.label.toLowerCase()} com qualidade selecionada.`
})

function fechar() {
  emit('close')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') fechar()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" @click="fechar">
      <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>

      <article
        class="relative z-10 w-full max-w-4xl max-h-[60vh] rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col"
        @click.stop
      >
        <button
          type="button"
          class="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          aria-label="Fechar detalhes"
          @click="fechar"
        >
          <span class="material-symbols-outlined">close</span>
        </button>

        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="bg-slate-800/70 p-6 flex items-center justify-center min-h-[320px]">
            <img
              :src="produto.img"
              :alt="produto.nome"
              class="max-h-[380px] w-full object-contain"
            />
          </div>

          <div class="scrollbar-custom p-6 md:p-8 flex flex-col gap-4 overflow-y-auto max-h-[60vh]">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[11px] font-semibold tracking-wider uppercase rounded-full bg-slate-800 text-slate-300 px-3 py-1">
                {{ produto.label }}
              </span>
              <span
                v-if="produto.tag"
                class="text-[11px] font-semibold tracking-wider uppercase rounded-full px-3 py-1"
                :class="produto.tag === 'Promoção' ? 'bg-red-500 text-white' : 'bg-[#d4af37] text-slate-900'"
              >
                {{ produto.tag }}
              </span>
            </div>

            <h2 class="text-2xl font-bold text-slate-100 leading-tight">{{ produto.nome }}</h2>
            <p class="text-slate-300 leading-relaxed">{{ descricaoProduto }}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="rounded-lg bg-slate-800/70 border border-slate-700 p-3">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Categoria</p>
                <p class="text-slate-100 font-medium">{{ produto.label }}</p>
              </div>

              <div class="rounded-lg bg-slate-800/70 border border-slate-700 p-3">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Preço</p>
                <p class="text-[#d4af37] font-bold">{{ formatarPreco(produto.preco) }}</p>
                <p v-if="produto.precoAntigo" class="text-xs text-slate-500 line-through">{{ formatarPreco(produto.precoAntigo) }}</p>
              </div>

              <div v-if="produto.pais" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3">
                <p class="text-xs text-slate-400 uppercase tracking-wider">País de Origem</p>
                <p class="text-slate-100">{{ produto.pais }}</p>
              </div>

              <div v-if="produto.regiao" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Região</p>
                <p class="text-slate-100">{{ produto.regiao }}</p>
              </div>

              <div v-if="produto.volume" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Volume</p>
                <p class="text-slate-100">{{ produto.volume }}</p>
              </div>

              <div v-if="produto.alcool !== undefined" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Teor alcoólico</p>
                <p class="text-slate-100">{{ produto.alcool }}%</p>
              </div>

              <div v-if="produto.temperatura" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Temperatura Ideal</p>
                <p class="text-slate-100">{{ produto.temperatura }}</p>
              </div>

              <div v-if="produto.uvasPrincipais" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Uvas Principais</p>
                <p class="text-slate-100 text-sm">{{ produto.uvasPrincipais }}</p>
              </div>

              <div v-if="produto.notas" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3 sm:col-span-2">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Notas de Sabor</p>
                <p class="text-slate-100 text-sm">{{ produto.notas }}</p>
              </div>

              <div v-if="produto.harmonizacao" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3 sm:col-span-2">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Harmonização Sugerida</p>
                <p class="text-slate-100 text-sm">{{ produto.harmonizacao }}</p>
              </div>

              <div v-if="produto.processo" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3 sm:col-span-2">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Processo de Produção</p>
                <p class="text-slate-100 text-sm">{{ produto.processo }}</p>
              </div>

              <div v-if="produto.envelhecimento" class="rounded-lg bg-slate-800/70 border border-slate-700 p-3 sm:col-span-2">
                <p class="text-xs text-slate-400 uppercase tracking-wider">Envelhecimento / Armazenamento</p>
                <p class="text-slate-100 text-sm">{{ produto.envelhecimento }}</p>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-700/70 flex items-center justify-end">
              <button
                type="button"
                class="w-10 h-10 rounded-lg bg-slate-800 hover:bg-[#d4af37] text-white hover:text-slate-900 flex items-center justify-center transition-colors"
                aria-label="Adicionar ao carrinho"
                @click="carrinho.adicionar(produto)"
              >
                <span class="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </Teleport>
</template>

<style scoped>
/* Estilização da barra de rolagem para Webkit (Chrome, Safari, Edge) */
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 4px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #d4af37, #a68f2f);
  border-radius: 4px;
  border: 2px solid rgba(15, 23, 42, 0.8);
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #e5c158, #b89f3f);
}

/* Estilização da barra de rolagem para Firefox */
.scrollbar-custom {
  scrollbar-color: #d4af37 rgba(15, 23, 42, 0.8);
  scrollbar-width: thin;
}
</style>
