<script setup lang="ts">
import { ref, computed, onMounted } from 'vue' // <-- onMounted adicionado
import { useAuthStore } from '@/stores/auth'
import { useFormatters } from '@/composables/useFormatters'
import type { Pedido } from '@/types'
import { supabase } from '@/lib/supabase'

const auth = useAuthStore()
const { formatarPreco } = useFormatters()

const pedidosExpandidos = ref<string[]>([])
const meusPedidos = ref<Pedido[]>([]) // <-- Deixou de ser computed e virou ref

const nomeUsuario = computed(() => {
  if (!auth.usuario) return ''
  return (auth.usuario.user_metadata?.nome || auth.usuario.email || '').split(' ')[0]
})

// Função para buscar no banco de dados
async function buscarPedidosDoBanco() {
  if (!auth.usuario) return

  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .eq('donoDoPedido', auth.usuario.email) // Filtra só os pedidos deste usuário

  if (error) {
    console.error('Erro ao buscar pedidos:', error)
  } else if (data) {
    // Como os mais novos entram por último no BD, invertemos a lista para o mais recente ficar no topo
    meusPedidos.value = (data as Pedido[]).reverse() 
  }
}

// Dispara a busca assim que a tela abre
onMounted(() => {
  buscarPedidosDoBanco()
})

function toggleDetalhes(id: string) {
  const index = pedidosExpandidos.value.indexOf(id)
  if (index > -1) {
    pedidosExpandidos.value.splice(index, 1) 
  } else {
    pedidosExpandidos.value.push(id) 
  }
}
</script>

<template>
  <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-slate-100 mb-8">Meus Pedidos</h1>

    <div v-if="!auth.usuario" class="text-center text-slate-500 py-10">
      <RouterLink to="/login" class="text-[#137fec] hover:underline">Faça login</RouterLink> para ver seus pedidos.
    </div>

    <div v-else-if="meusPedidos.length === 0" class="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
      <span class="material-symbols-outlined text-6xl">receipt_long</span>
      <p class="text-lg">Você ainda não possui pedidos, {{ nomeUsuario }}.</p>
      <RouterLink to="/produtos" class="mt-4 px-8 py-3 bg-[#137fec] text-white font-bold rounded-xl hover:bg-[#137fec]/90 transition-colors shadow-md">
        Ver Produtos
      </RouterLink>
    </div>

    <div v-else class="flex flex-col gap-6">
      <div
        v-for="pedido in meusPedidos"
        :key="pedido.id"
        class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm"
      >
        <div class="flex flex-wrap justify-between items-center border-b border-slate-800 pb-4 mb-4 gap-4">
          <div>
            <p class="text-sm text-slate-400">Pedido <span class="font-bold text-slate-100">{{ pedido.id }}</span></p>
            <p class="text-sm text-slate-400">Realizado em: {{ pedido.data }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-slate-400">Total Pago</p>
            <p class="font-bold text-[#137fec] text-lg">{{ formatarPreco(pedido.total) }}</p>
          </div>
          <span class="bg-green-900/30 text-green-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            {{ pedido.status }}
          </span>
        </div>
        
        <!-- Itens do Pedido -->
        <div class="flex flex-col gap-4">
          <div v-for="item in pedido.itens" :key="item.id" class="flex items-center gap-4">
            <div
              class="h-16 w-16 rounded-lg bg-slate-800 bg-cover bg-center flex-shrink-0 border border-slate-700"
              :style="{ backgroundImage: `url('${item.img}')` }"
            />
            <div class="flex-1">
              <p class="font-bold text-slate-100 text-sm">{{ item.nome }}</p>
              <p class="text-sm text-slate-400">Qtd: {{ item.quantidade }}</p>
            </div>
          </div>
        </div>

        <!-- Seção de Mais Detalhes -->
        <div class="mt-6 pt-4 border-t border-slate-800">
          <button 
            @click="toggleDetalhes(pedido.id)" 
            class="text-[#137fec] text-sm font-bold flex items-center gap-1 hover:underline transition-all"
          >
            {{ pedidosExpandidos.includes(pedido.id) ? 'Ocultar detalhes' : 'Mais detalhes' }}
            <span class="material-symbols-outlined text-[18px]">
              {{ pedidosExpandidos.includes(pedido.id) ? 'expand_less' : 'expand_more' }}
            </span>
          </button>

          <!-- Caixa de Informações Expandida -->
          <div 
            v-if="pedidosExpandidos.includes(pedido.id)" 
            class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50"
          >
            <div>
              <p class="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">local_shipping</span> Local de Entrega
              </p>
              <p class="text-sm text-slate-100 font-medium">
                {{ pedido.endereco || 'Endereço não informado' }}
              </p>
            </div>
            
            <div>
              <p class="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">payments</span> Método de Pagamento
              </p>
              <p class="text-sm text-slate-100 font-medium">
                {{ pedido.metodoPagamento || 'Não informado' }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>

  <footer class="border-t border-slate-800 mt-12 py-8 text-center text-slate-500 text-sm">
    <p>© 2026 Bebidas Premium. Site desenvolvido para a disciplina Desenvolvimento Web em 2026.</p>
  </footer>
</template>