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
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 lg:p-12" @click="fechar">
      <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>

      <article
        class="relative z-10 w-full max-w-3xl md:max-w-5xl max-h-[95vh] md:max-h-[85vh] rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        @click.stop
      >
        <button
          type="button"
          class="absolute right-3 top-3 sm:right-4 sm:top-4 md:right-8 md:top-8 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors shadow-lg border border-slate-700/50"
          aria-label="Fechar detalhes"
          @click="fechar"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div class="w-full md:w-1/2 bg-slate-800/70 p-10 sm:p-12 md:p-8 flex items-center justify-center max-h-[40vh] md:max-h-full">
            <img
              :src="produto.img"
              :alt="produto.nome"
              class="max-h-[350px] w-full object-contain"
            />
          </div>

          <div class="scrollbar-custom w-full md:w-1/2 pt-14 px-5 md:pl-8 md:pr-12 lg:pr-16 py-5 md:py-8 flex flex-col gap-4 md:gap-6 overflow-y-auto max-h-[55vh] md:max-h-full">
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

            <div class="flex flex-wrap items-stretch gap-2 md:gap-3 lg:gap-4">
              
              <div class="flex-1 min-w-[140px] rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Categoria</p>
                <p class="text-slate-100 font-medium">{{ produto.label }}</p>
              </div>

              <div class="flex-1 min-w-[140px] rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Preço</p>
                <p class="text-[#d4af37] font-bold">{{ formatarPreco(produto.preco) }}</p>
                <p v-if="produto.precoAntigo" class="text-xs text-slate-500 line-through">{{ formatarPreco(produto.precoAntigo) }}</p>
              </div>

              <div v-if="produto.pais" class="flex-1 min-w-[140px] rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">País de Origem</p>
                <p class="text-slate-100">{{ produto.pais }}</p>
              </div>

              <div v-if="produto.regiao" class="flex-1 min-w-[140px] rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Região</p>
                <p class="text-slate-100">{{ produto.regiao }}</p>
              </div>

              <div v-if="produto.volume" class="flex-1 min-w-[140px] rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Volume</p>
                <p class="text-slate-100">{{ produto.volume }}</p>
              </div>

              <div v-if="produto.alcool !== undefined" class="flex-1 min-w-[140px] rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Teor alcoólico</p>
                <p class="text-slate-100">{{ produto.alcool }}%</p>
              </div>

              <div v-if="produto.temperatura" class="flex-1 min-w-[140px] rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Temperatura Ideal</p>
                <p class="text-slate-100">{{ produto.temperatura }}</p>
              </div>

              <div v-if="produto.uvasPrincipais" class="flex-1 min-w-[140px] rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Uvas Principais</p>
                <p class="text-slate-100 text-sm">{{ produto.uvasPrincipais }}</p>
              </div>

              <div v-if="produto.notas" class="w-full rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Notas de Sabor</p>
                <p class="text-slate-100 text-sm">{{ produto.notas }}</p>
              </div>

              <div v-if="produto.harmonizacao" class="w-full rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Harmonização Sugerida</p>
                <p class="text-slate-100 text-sm">{{ produto.harmonizacao }}</p>
              </div>

              <div v-if="produto.processo" class="w-full rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Processo de Produção</p>
                <p class="text-slate-100 text-sm">{{ produto.processo }}</p>
              </div>

              <div v-if="produto.envelhecimento" class="w-full rounded-lg bg-slate-800/70 border border-slate-700 p-4 flex flex-col justify-center">
                <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Envelhecimento / Armazenamento</p>
                <p class="text-slate-100 text-sm">{{ produto.envelhecimento }}</p>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-700/70 flex items-center justify-end mt-2">
              <button
                type="button"
                class="w-12 h-12 rounded-xl bg-slate-800 hover:bg-[#d4af37] text-white hover:text-slate-900 flex items-center justify-center transition-all shadow-md"
                aria-label="Adicionar ao carrinho"
                @click="carrinho.adicionar(produto)"
              >
                <span class="material-symbols-outlined text-2xl">add_shopping_cart</span>
              </button>
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