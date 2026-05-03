<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { Produto } from '@/types'

const router = useRouter()
const authStore = useAuthStore()

// Redireciona se não for loja
if (authStore.usuario?.user_metadata?.tipo_conta !== 'loja') {
  router.push('/')
}

// Produtos armazenados localmente
const produtos = ref<Produto[]>(JSON.parse(localStorage.getItem('meusProdutos') || '[]'))

// Formulário
const editandoId = ref<number | null>(null)
const formulario = ref<{
  nome: string
  categoria: 'vinho' | 'destilados' | 'cerveja' | 'sem-alcool'
  label: string
  preco: number
  precoAntigo?: number
  tag?: string
  img: string
  descricao?: string
  origem?: string
  regiao?: string
  alcool?: number
  volume?: string
  pais?: string
  notas?: string
  harmonizacao?: string
  temperatura?: string
  uvasPrincipais?: string
  processo?: string
  envelhecimento?: string
}>({
  nome: '',
  categoria: 'vinho',
  label: '',
  preco: 0,
  precoAntigo: undefined,
  tag: '',
  img: '',
  descricao: '',
  origem: '',
  regiao: '',
  alcool: undefined,
  volume: '',
  pais: '',
  notas: '',
  harmonizacao: '',
  temperatura: '',
  uvasPrincipais: '',
  processo: '',
  envelhecimento: '',
})

const mensagem = ref('')
const mensagemTipo = ref<'sucesso' | 'erro' | null>(null)

// Produtos do usuário
const meusProdutos = computed(() => {
  const usuarioId = authStore.usuario?.id
  return produtos.value.filter(p => p.ownerId === usuarioId)
})

// IDs únicos para novos produtos
const proximoId = computed(() => {
  const ids = produtos.value.map(p => p.id)
  return ids.length > 0 ? Math.max(...ids) + 1 : 1
})

// Limpar formulário
const limparFormulario = () => {
  editandoId.value = null
  formulario.value = {
    nome: '',
    categoria: 'vinho',
    label: '',
    preco: 0,
    precoAntigo: undefined,
    tag: '',
    img: '',
    descricao: '',
    origem: '',
    regiao: '',
    alcool: undefined,
    volume: '',
    pais: '',
    notas: '',
    harmonizacao: '',
    temperatura: '',
    uvasPrincipais: '',
    processo: '',
    envelhecimento: '',
  }
}

// Editar produto
const editarProduto = (produto: Produto) => {
  editandoId.value = produto.id
  formulario.value = { ...produto }
}

// Salvar produto
const salvarProduto = () => {
  // Validar campos obrigatórios
  if (!formulario.value.nome.trim() || !formulario.value.label.trim() || formulario.value.preco <= 0 || !formulario.value.img.trim()) {
    mensagem.value = 'Preencha todos os campos obrigatórios!'
    mensagemTipo.value = 'erro'
    setTimeout(() => {
      mensagem.value = ''
      mensagemTipo.value = null
    }, 3000)
    return
  }

  if (editandoId.value) {
    // Atualizar
    const index = produtos.value.findIndex(p => p.id === editandoId.value)
    if (index !== -1) {
      produtos.value[index] = {
        ...formulario.value,
        id: editandoId.value,
        ownerId: authStore.usuario?.id,
        lojaNome: authStore.usuario?.user_metadata?.nome,
      }
    }
  } else {
    // Criar novo
    produtos.value.push({
      ...formulario.value,
      id: proximoId.value,
      ownerId: authStore.usuario?.id,
      lojaNome: authStore.usuario?.user_metadata?.nome,
    } as Produto)
  }

  // Salvar no localStorage
  localStorage.setItem('meusProdutos', JSON.stringify(produtos.value))

  mensagem.value = editandoId.value ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!'
  mensagemTipo.value = 'sucesso'
  limparFormulario()

  setTimeout(() => {
    mensagem.value = ''
    mensagemTipo.value = null
  }, 3000)
}

// Deletar produto
const deletarProduto = (id: number) => {
  if (confirm('Tem certeza que deseja deletar este produto?')) {
    produtos.value = produtos.value.filter(p => p.id !== id)
    localStorage.setItem('meusProdutos', JSON.stringify(produtos.value))
    mensagem.value = 'Produto deletado com sucesso!'
    mensagemTipo.value = 'sucesso'
    setTimeout(() => {
      mensagem.value = ''
      mensagemTipo.value = null
    }, 3000)
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#101922] text-slate-100">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-4xl font-black text-white mb-2">Painel da Loja</h1>
        <p class="text-slate-400">Gerenciar seus produtos e adicionar novos itens</p>
      </div>

      <!-- Mensagem -->
      <div
        v-if="mensagem"
        :class="['mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium',
          mensagemTipo === 'sucesso' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30']"
      >
        <span class="material-symbols-outlined">{{ mensagemTipo === 'sucesso' ? 'check_circle' : 'error' }}</span>
        {{ mensagem }}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulário -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
            <h2 class="text-xl font-bold text-white mb-6">{{ editandoId ? 'Editar Produto' : 'Novo Produto' }}</h2>

            <form @submit.prevent="salvarProduto" class="flex flex-col gap-4">
              <!-- Nome -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Nome *</span>
                <input
                  v-model="formulario.nome"
                  type="text"
                  required
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Vinho Tinto Reserva"
                />
              </label>

              <!-- Categoria -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Categoria *</span>
                <select
                  v-model="formulario.categoria"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm"
                >
                  <option value="vinho">Vinho</option>
                  <option value="destilados">Destilados</option>
                  <option value="cerveja">Cerveja</option>
                  <option value="sem-alcool">Sem Álcool</option>
                </select>
              </label>

              <!-- Label -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Label *</span>
                <input
                  v-model="formulario.label"
                  type="text"
                  required
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Tinto"
                />
              </label>

              <!-- Preço -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Preço *</span>
                <input
                  v-model.number="formulario.preco"
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="0.00"
                />
              </label>

              <!-- Preço Antigo -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Preço Antigo</span>
                <input
                  v-model.number="formulario.precoAntigo"
                  type="number"
                  step="0.01"
                  min="0"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="0.00"
                />
              </label>

              <!-- URL Imagem -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">URL da Imagem *</span>
                <input
                  v-model="formulario.img"
                  type="url"
                  required
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="https://..."
                />
              </label>

              <!-- Tag -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Tag</span>
                <input
                  v-model="formulario.tag"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Premium"
                />
              </label>

              <!-- Descrição -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Descrição</span>
                <textarea
                  v-model="formulario.descricao"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500 resize-none h-20"
                  placeholder="Descrição do produto"
                />
              </label>

              <!-- Origem -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Origem</span>
                <input
                  v-model="formulario.origem"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Vale do Douro"
                />
              </label>

              <!-- Região -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Região</span>
                <input
                  v-model="formulario.regiao"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Portugal"
                />
              </label>

              <!-- País -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">País</span>
                <input
                  v-model="formulario.pais"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Portugal"
                />
              </label>

              <!-- Álcool -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Álcool (%)</span>
                <input
                  v-model.number="formulario.alcool"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="13.5"
                />
              </label>

              <!-- Volume -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Volume</span>
                <input
                  v-model="formulario.volume"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: 750ml"
                />
              </label>

              <!-- Uvas Principais -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Uvas Principais</span>
                <input
                  v-model="formulario.uvasPrincipais"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Tinta Roriz, Touriga Nacional"
                />
              </label>

              <!-- Notas -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Notas</span>
                <input
                  v-model="formulario.notas"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Notas de frutas vermelhas"
                />
              </label>

              <!-- Harmonização -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Harmonização</span>
                <input
                  v-model="formulario.harmonizacao"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Carnes vermelhas"
                />
              </label>

              <!-- Temperatura -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Temperatura</span>
                <input
                  v-model="formulario.temperatura"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: 16-18°C"
                />
              </label>

              <!-- Processo -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Processo</span>
                <input
                  v-model="formulario.processo"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: Fermentação tradicional"
                />
              </label>

              <!-- Envelhecimento -->
              <label class="flex flex-col gap-1.5">
                <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Envelhecimento</span>
                <input
                  v-model="formulario.envelhecimento"
                  type="text"
                  class="rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:ring-[#d4af37] focus:border-[#d4af37] px-3 py-2 text-sm placeholder:text-slate-500"
                  placeholder="ex: 12 meses em carvalho"
                />
              </label>

              <!-- Botões -->
              <div class="flex gap-3 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-[#d4af37] hover:bg-[#d4af37]/90 text-slate-900 rounded-lg h-10 font-bold transition-all"
                >
                  {{ editandoId ? 'Atualizar' : 'Adicionar' }}
                </button>
                <button
                  v-if="editandoId"
                  type="button"
                  @click="limparFormulario"
                  class="flex-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg h-10 font-bold transition-all"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Lista de Produtos -->
        <div class="lg:col-span-2">
          <div class="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
            <h2 class="text-xl font-bold text-white mb-6">Meus Produtos ({{ meusProdutos.length }})</h2>

            <div v-if="meusProdutos.length === 0" class="text-center py-12">
              <span class="material-symbols-outlined text-6xl text-slate-600 mb-4 block">shopping_bag</span>
              <p class="text-slate-400">Você ainda não adicionou nenhum produto</p>
            </div>

            <div v-else class="grid gap-4">
              <div
                v-for="produto in meusProdutos"
                :key="produto.id"
                class="flex gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-[#d4af37]/50 transition-colors"
              >
                <!-- Imagem -->
                <img
                  :src="produto.img"
                  :alt="produto.nome"
                  class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />

                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2 mb-1">
                    <h3 class="font-bold text-white truncate">{{ produto.nome }}</h3>
                    <span v-if="produto.tag" class="text-xs bg-[#d4af37]/20 text-[#d4af37] px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                      {{ produto.tag }}
                    </span>
                  </div>

                  <p class="text-sm text-slate-400 mb-2">{{ produto.label }} • {{ produto.categoria }}</p>

                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-lg font-bold text-[#d4af37]">R$ {{ produto.preco.toFixed(2) }}</span>
                    <span v-if="produto.precoAntigo" class="text-sm text-slate-500 line-through">R$ {{ produto.precoAntigo.toFixed(2) }}</span>
                  </div>

                  <p v-if="produto.descricao" class="text-xs text-slate-400 line-clamp-2">{{ produto.descricao }}</p>
                </div>

                <!-- Ações -->
                <div class="flex flex-col gap-2 flex-shrink-0">
                  <button
                    @click="editarProduto(produto)"
                    class="flex items-center gap-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
                  >
                    <span class="material-symbols-outlined text-[16px]">edit</span>
                    Editar
                  </button>
                  <button
                    @click="deletarProduto(produto.id)"
                    class="flex items-center gap-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
                  >
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
