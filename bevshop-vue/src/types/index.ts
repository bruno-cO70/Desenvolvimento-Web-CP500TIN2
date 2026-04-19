export interface Produto {
  id: number
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
}

export interface ItemCarrinho extends Produto {
  quantidade: number
}

export interface Pedido {
  id: string
  data: string
  donoDoPedido: string
  itens: ItemCarrinho[]
  total: number
  status: string
}

export type FiltroCategoria = 'vinho' | 'destilados' | 'cerveja' | 'sem-alcool'
export type OrdenacaoTipo = 'relevancia' | 'menor' | 'maior'