<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Produto } from '@/types'
import { useCarrinhoStore } from '@/stores/carrinho'
import { useFormatters } from '@/composables/useFormatters'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabase'

const props = defineProps<{ produto: Produto }>()
const emit = defineEmits<{
  (event: 'open-details', produto: Produto): void
}>()

const carrinho = useCarrinhoStore()
const authStore = useAuthStore()
const { formatarPreco } = useFormatters()

// 1. CHECAGEM DE ADMIN
const emailAdmin = 'bevshop@email.com'
const isAdmin = computed(() => {
  return authStore.usuario?.email === emailAdmin
})

// 2. CONTROLE DOS MODAIS
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const isSubmitting = ref(false)
const inputPreco = ref<number | string>(props.produto.preco)

// 3. FUNÇÕES DO SUPABASE
const salvarPreco = async () => {
  const precoFormatado = parseFloat(inputPreco.value.toString().replace(',', '.'))
  
  if (isNaN(precoFormatado)) {
    alert('Valor inválido! Digite apenas números.')
    return
  }

  isSubmitting.value = true
  
  // O .select() no final obriga o Supabase a devolver os dados que ele acabou de alterar
  const { data, error } = await supabase
    .from('produtos_loja')
    .update({ preco: precoFormatado })
    .eq('id', props.produto.id)
    .select() 

  if (error) {
    alert('Erro ao atualizar: ' + error.message)
    isSubmitting.value = false
  } else if (!data || data.length === 0) {
    // Se não deu erro, mas o data veio vazio, o RLS bloqueou silenciosamente!
    alert('ALERTA: O banco bloqueou a edição! Vá no Supabase e desative o RLS da tabela produtos_loja.')
    isSubmitting.value = false
  } else {
    alert('Sucesso! O banco de dados foi atualizado.')
    window.location.reload() 
  }
}

const confirmarDelecao = async () => {
  isSubmitting.value = true
  const { error } = await supabase
    .from('produtos_loja')
    .delete()
    .eq('id', props.produto.id)

  if (error) {
    alert('Erro ao deletar: ' + error.message)
    isSubmitting.value = false
  } else {
    window.location.reload() // Recarrega a página para o produto sumir da tela
  }
}
</script>

<template>
  <div
    class="group flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-600 transition-all duration-300 p-4 h-full cursor-pointer relative"
    @click="emit('open-details', produto)"
  >
    <!-- Imagem e Tag -->
    <div class="w-full aspect-[4/5] bg-slate-800/50 rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
      <span
        v-if="produto.tag"
        class="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10 text-white"
        :class="produto.tag === 'Promoção' ? 'bg-red-500' : 'bg-[#d4af37] text-slate-900'"
      >{{ produto.tag }}</span>
      
      <img
        :src="produto.img"
        :alt="produto.nome"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>

    <div class="flex flex-col grow">
      <p class="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">{{ produto.label }}</p>
      <h4 class="text-left text-slate-100 font-bold text-base leading-tight mb-4 group-hover:text-[#d4af37] transition-colors">{{ produto.nome }}</h4>

      <div class="mt-auto flex items-center justify-between">
        <div class="flex flex-col">
          <span v-if="produto.precoAntigo" class="text-xs text-slate-500 line-through">{{ formatarPreco(produto.precoAntigo) }}</span>
          <p class="text-[#d4af37] font-bold text-xl">{{ formatarPreco(produto.preco) }}</p>
        </div>
        <button
          class="w-10 h-10 rounded-lg bg-slate-800 hover:bg-[#d4af37] text-white hover:text-slate-900 flex items-center justify-center transition-colors"
          @click.stop
          @click="carrinho.adicionar(produto)"
        >
          <span class="material-symbols-outlined">add_shopping_cart</span>
        </button>
      </div>

      <!-- PAINEL EXCLUSIVO DO ADMIN -->
      <div v-if="isAdmin" class="mt-4 flex gap-2 pt-4 border-t border-slate-800" @click.stop>
        <button 
          @click.stop="showEditModal = true; inputPreco = produto.preco" 
          class="flex-1 bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600 text-blue-400 hover:text-white text-[11px] font-bold py-2 rounded transition-colors"
        >
          MUDAR PREÇO
        </button>
        <button 
          @click.stop="showDeleteModal = true" 
          class="flex-1 bg-red-600/20 border border-red-600/50 hover:bg-red-600 text-red-400 hover:text-white text-[11px] font-bold py-2 rounded transition-colors"
        >
          EXCLUIR
        </button>
      </div>
    </div>
  </div>

  <!-- MODAL DE EDIÇÃO DE PREÇO -->
  <Teleport to="body">
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" @click.stop="showEditModal = false">
      <div class="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl" @click.stop>
        <div class="flex items-center gap-3 mb-2">
          <span class="material-symbols-outlined text-[#d4af37]">edit</span>
          <h3 class="text-xl font-bold text-slate-100">Alterar Preço</h3>
        </div>
        <p class="text-sm text-slate-400 mb-6">Produto: <strong class="text-white">{{ produto.nome }}</strong></p>

        <div class="mb-6">
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Novo Preço (R$)</label>
          <input
            v-model="inputPreco"
            type="number"
            step="0.01"
            class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
          />
        </div>

        <div class="flex gap-3">
          <button @click="showEditModal = false" class="flex-1 py-3 rounded-lg font-bold text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
            CANCELAR
          </button>
          <button @click="salvarPreco" :disabled="isSubmitting" class="flex-1 py-3 rounded-lg font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-50">
            {{ isSubmitting ? 'SALVANDO...' : 'SALVAR' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- MODAL DE EXCLUSÃO -->
  <Teleport to="body">
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" @click.stop="showDeleteModal = false">
      <div class="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl" @click.stop>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-red-500">warning</span>
          </div>
          <h3 class="text-xl font-bold text-slate-100">Excluir Produto</h3>
        </div>
        
        <p class="text-sm text-slate-400 mb-6">
          Tem certeza que deseja excluir <strong class="text-white">{{ produto.nome }}</strong>? Esta ação não poderá ser desfeita.
        </p>

        <div class="flex gap-3">
          <button @click="showDeleteModal = false" class="flex-1 py-3 rounded-lg font-bold text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
            CANCELAR
          </button>
          <button @click="confirmarDelecao" :disabled="isSubmitting" class="flex-1 py-3 rounded-lg font-bold text-sm bg-red-600 text-white hover:bg-red-500 transition-colors disabled:opacity-50">
            {{ isSubmitting ? 'EXCLUINDO...' : 'EXCLUIR' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>