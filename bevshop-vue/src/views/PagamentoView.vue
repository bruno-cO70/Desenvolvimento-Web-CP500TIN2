<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCarrinhoStore } from '@/stores/carrinho'
import { useAuthStore } from '@/stores/auth'
import { useFormatters } from '@/composables/useFormatters'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const carrinhoStore = useCarrinhoStore()
const authStore = useAuthStore()
const { formatarPreco } = useFormatters()

const carregando = ref(false)

const form = ref({
  nome: '',
  endereco: '',
  cidade: '',
  estado: '',
  cep: '',
  metodo: 'cartao'
})

const finalizarPedido = async () => {
  const novoPedido = {
    id: `PED-${Math.random().toString(36).slice(2, 11).toUpperCase()}`,
    donoDoPedido: authStore.usuario!.email,
    data: new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    total: carrinhoStore.subtotal,
    status: 'Aprovado',
    itens: [...carrinhoStore.itens],
    endereco: form.value.endereco,
    metodoPagamento: form.value.metodo === 'cartao' ? 'Cartão de Crédito' : 'PIX'
  }

  const { error } = await supabase
    .from('pedidos')
    .insert([novoPedido])

  if (error) {
    alert('Erro ao salvar pedido no banco: ' + error.message)
    return false
  }

  carrinhoStore.limpar()
  return true
}

const processarPagamento = async () => {
  if (carrinhoStore.itens.length === 0) {
    alert('Seu carrinho está vazio!')
    return
  }

  if (!authStore.usuario) {
    alert('Você precisa estar logado para finalizar a compra.')
    router.push('/login')
    return
  }

  try {
    carregando.value = true

    if (form.value.metodo === 'pix') {
      const salvoComSucesso = await finalizarPedido()

      if (salvoComSucesso) {
        alert('QR Code PIX gerado com sucesso!\n\nPagamento aprovado em ambiente de testes.')
        router.push('/pedidos')
      }
      return
    }

    const response = await fetch(
      'http://localhost:4242/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          metodo: form.value.metodo,
          total: carrinhoStore.subtotal
        })
      }
    )

    const data = await response.json()

    if (data.url) {
      const salvoComSucesso = await finalizarPedido()
      
      if (salvoComSucesso) {
        window.location.href = data.url
      }
    } else {
      alert('Erro ao iniciar pagamento.')
    }

  } catch (error) {
    alert('Erro ao conectar com o pagamento.')
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <main class="flex-1 w-full max-w-[1200px] mx-auto px-4 py-8 lg:py-12 text-white">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Finalizar Pedido</h1>
      <p class="text-slate-400">Complete os detalhes abaixo para receber suas bebidas.</p>
    </div>

    <form @submit.prevent="processarPagamento" class="flex flex-col lg:flex-row gap-10">
      <div class="flex-1 space-y-8">
        <section class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined text-[#d4af37]">local_shipping</span>
            Entrega
          </h2>

          <div class="grid grid-cols-1 gap-4">
            <input
              v-model="form.nome"
              required
              class="bg-slate-900 border-slate-700 rounded-lg p-3 w-full"
              placeholder="Nome Completo"
            />
            <input
              v-model="form.endereco"
              required
              class="bg-slate-900 border-slate-700 rounded-lg p-3 w-full"
              placeholder="Endereço Completo"
            />
          </div>
        </section>

        <section class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined text-[#d4af37]">payments</span>
            Pagamento
          </h2>

          <div class="flex gap-4 mb-6">
            <button
              type="button"
              @click="form.metodo = 'cartao'"
              :class="[
                'flex-1 p-3 border rounded-lg transition-colors',
                form.metodo === 'cartao' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-slate-700'
              ]"
            >
              Cartão
            </button>
            <button
              type="button"
              @click="form.metodo = 'pix'"
              :class="[
                'flex-1 p-3 border rounded-lg transition-colors',
                form.metodo === 'pix' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-slate-700'
              ]"
            >
              PIX
            </button>
          </div>

          <div v-if="form.metodo === 'pix'" class="bg-slate-900 border border-slate-700 rounded-xl p-6 text-center">
            <p class="text-slate-300 mb-4">Escaneie o QR Code abaixo para simular o pagamento via PIX.</p>
            <img src="/qrcode.png" alt="QR Code PIX" class="w-56 mx-auto rounded-xl bg-white p-2 object-contain" />
            <p class="text-[#d4af37] font-semibold mt-4">Chave PIX:</p>
            <p class="text-slate-300 break-all">bevshop@pix.com</p>
            <p class="text-slate-500 text-sm mt-4">Ambiente de testes para apresentação acadêmica.</p>
          </div>

          <p v-if="form.metodo === 'cartao'" class="text-slate-400 text-sm">
            O pagamento será processado pelo Stripe em modo teste, sem cobrança real.
          </p>
        </section>
      </div>

      <aside class="w-full lg:w-[400px]">
        <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 sticky top-24">
          <h2 class="text-xl font-bold mb-6">Resumo do Pedido</h2>

          <div class="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
            <div v-for="item in carrinhoStore.itens" :key="item.id" class="flex justify-between items-center text-sm">
              <span class="text-slate-300">{{ item.quantidade }}x {{ item.nome }}</span>
              <span class="font-medium">{{ formatarPreco(item.preco * item.quantidade) }}</span>
            </div>
          </div>

          <div class="border-t border-slate-700 pt-4 space-y-2">
            <div class="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span>{{ formatarPreco(carrinhoStore.subtotal) }}</span>
            </div>
            <div class="flex justify-between text-xl font-bold pt-2">
              <span>Total</span>
              <span class="text-[#d4af37]">{{ formatarPreco(carrinhoStore.subtotal) }}</span>
            </div>
          </div>

          <button
            type="submit"
            :disabled="carrinhoStore.itens.length === 0 || carregando"
            class="w-full bg-[#d4af37] text-slate-900 font-bold py-4 rounded-lg mt-8 hover:bg-[#b8982e] transition-colors disabled:opacity-50"
          >
            {{ carregando ? 'PROCESSANDO...' : form.metodo === 'pix' ? 'CONFIRMAR PAGAMENTO PIX' : 'FINALIZAR COMPRA' }}
          </button>
        </div>
      </aside>
    </form>
  </main>
</template>