<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCarrinhoStore } from '@/stores/carrinho'
import { useFormatters } from '@/composables/useFormatters'

const router = useRouter()
const carrinhoStore = useCarrinhoStore()
const { formatarPreco } = useFormatters()

const form = ref({
  nome: '',
  endereco: '',
  cidade: '',
  estado: '',
  cep: '',
  metodo: 'cartao',
  numeroCartao: '',
  nomeCartao: '',
  validade: '',
  cvv: ''
})

const processarPagamento = () => {
  if (carrinhoStore.itens.length === 0) {
    alert('Seu carrinho está vazio!')
    return
  }

  alert('Pagamento aprovado! O seu pedido foi realizado com sucesso.')
  
  // CORREÇÃO: Usando 'limpar' que é o nome na sua store
  carrinhoStore.limpar() 
  router.push('/') 
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
            <span class="material-symbols-outlined text-[#d4af37]">local_shipping</span> Entrega
          </h2>
          <div class="grid grid-cols-1 gap-4">
            <input v-model="form.nome" required class="bg-slate-900 border-slate-700 rounded-lg p-3 w-full" placeholder="Nome Completo" />
            <input v-model="form.endereco" required class="bg-slate-900 border-slate-700 rounded-lg p-3 w-full" placeholder="Endereço Completo" />
          </div>
        </section>

        <section class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined text-[#d4af37]">payments</span> Pagamento
          </h2>
          <div class="flex gap-4 mb-6">
            <button type="button" @click="form.metodo = 'cartao'" :class="['flex-1 p-3 border rounded-lg transition-colors', form.metodo === 'cartao' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-slate-700']">Cartão</button>
            <button type="button" @click="form.metodo = 'pix'" :class="['flex-1 p-3 border rounded-lg transition-colors', form.metodo === 'pix' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-slate-700']">PIX</button>
          </div>
          
          <div v-if="form.metodo === 'cartao'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input v-model="form.numeroCartao" placeholder="0000 0000 0000 0000" class="sm:col-span-2 bg-slate-900 border-slate-700 rounded-lg p-3" />
            <input v-model="form.validade" placeholder="MM/AA" class="bg-slate-900 border-slate-700 rounded-lg p-3" />
            <input v-model="form.cvv" placeholder="CVV" class="bg-slate-900 border-slate-700 rounded-lg p-3" />
          </div>
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

          <button type="submit" :disabled="carrinhoStore.itens.length === 0" class="w-full bg-[#d4af37] text-slate-900 font-bold py-4 rounded-lg mt-8 hover:bg-[#b8982e] transition-colors disabled:opacity-50">
            FINALIZAR COMPRA
          </button>
        </div>
      </aside>
    </form>
  </main>
</template>