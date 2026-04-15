import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ItemCarrinho, Produto } from '@/types'

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref<ItemCarrinho[]>(
    JSON.parse(localStorage.getItem('carrinhoBevShop') ?? '[]')
  )
  const aberto = ref(false)

  function salvar() {
    localStorage.setItem('carrinhoBevShop', JSON.stringify(itens.value))
  }

  function adicionar(produto: Produto) {
    const existente = itens.value.find(i => i.id === produto.id)
    if (existente) {
      existente.quantidade += 1
    } else {
      itens.value.push({ ...produto, quantidade: 1 })
    }
    salvar()
    aberto.value = true
  }

  function alterarQuantidade(id: number, delta: number) {
    const item = itens.value.find(i => i.id === id)
    if (!item) return
    item.quantidade += delta
    if (item.quantidade <= 0) remover(id)
    else salvar()
  }

  function remover(id: number) {
    itens.value = itens.value.filter(i => i.id !== id)
    salvar()
  }

  function limpar() {
    itens.value = []
    salvar()
  }

  const totalItens = computed(() =>
    itens.value.reduce((acc, i) => acc + i.quantidade, 0)
  )

  const subtotal = computed(() =>
    itens.value.reduce((acc, i) => acc + i.preco * i.quantidade, 0)
  )

  return { itens, aberto, adicionar, alterarQuantidade, remover, limpar, totalItens, subtotal }
})