import type { Produto } from '@/types'
import { produtos as produtosBase } from '@/data/produtos'
import { supabase } from '@/lib/supabase'

const PRODUTOS_LOJA_STORAGE_KEY = 'meusProdutos'
const TABELA_PRODUTOS_LOJA = 'produtos_loja'

function parseProdutos(value: string | null): Produto[] {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getProdutosLojaLocal(): Produto[] {
  if (typeof window === 'undefined') return []
  return parseProdutos(window.localStorage.getItem(PRODUTOS_LOJA_STORAGE_KEY))
}

export function salvarProdutosLojaLocal(produtos: Produto[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(PRODUTOS_LOJA_STORAGE_KEY, JSON.stringify(produtos))
}

export function getCatalogoProdutos(): Produto[] {
  const produtosLoja = getProdutosLojaLocal()
  const idsBase = new Set(produtosBase.map((produto) => produto.id))
  const produtosLojaSemColisao = produtosLoja.filter((produto) => !idsBase.has(produto.id))

  return [...produtosBase, ...produtosLojaSemColisao]
}

function mapearProdutoRemoto(row: Record<string, unknown>): Produto {
  return {
    id: Number(row.id),
    nome: String(row.nome ?? ''),
    categoria: (row.categoria as Produto['categoria']) ?? 'vinho',
    label: String(row.label ?? ''),
    preco: Number(row.preco ?? 0),
    precoAntigo: row.preco_antigo !== null && row.preco_antigo !== undefined ? Number(row.preco_antigo) : undefined,
    tag: row.tag ? String(row.tag) : undefined,
    img: String(row.img ?? ''),
    descricao: row.descricao ? String(row.descricao) : undefined,
    origem: row.origem ? String(row.origem) : undefined,
    regiao: row.regiao ? String(row.regiao) : undefined,
    alcool: row.alcool !== null && row.alcool !== undefined ? Number(row.alcool) : undefined,
    volume: row.volume ? String(row.volume) : undefined,
    pais: row.pais ? String(row.pais) : undefined,
    notas: row.notas ? String(row.notas) : undefined,
    harmonizacao: row.harmonizacao ? String(row.harmonizacao) : undefined,
    temperatura: row.temperatura ? String(row.temperatura) : undefined,
    uvasPrincipais: row.uvas_principais ? String(row.uvas_principais) : undefined,
    processo: row.processo ? String(row.processo) : undefined,
    envelhecimento: row.envelhecimento ? String(row.envelhecimento) : undefined,
    ownerId: row.owner_id ? String(row.owner_id) : undefined,
    lojaNome: row.loja_nome ? String(row.loja_nome) : undefined,
  }
}

function mapearProdutoParaRemoto(produto: Produto) {
  return {
    id: produto.id,
    nome: produto.nome,
    categoria: produto.categoria,
    label: produto.label,
    preco: produto.preco,
    preco_antigo: produto.precoAntigo ?? null,
    tag: produto.tag ?? null,
    img: produto.img,
    descricao: produto.descricao ?? null,
    origem: produto.origem ?? null,
    regiao: produto.regiao ?? null,
    alcool: produto.alcool ?? null,
    volume: produto.volume ?? null,
    pais: produto.pais ?? null,
    notas: produto.notas ?? null,
    harmonizacao: produto.harmonizacao ?? null,
    temperatura: produto.temperatura ?? null,
    uvas_principais: produto.uvasPrincipais ?? null,
    processo: produto.processo ?? null,
    envelhecimento: produto.envelhecimento ?? null,
    owner_id: produto.ownerId ?? null,
    loja_nome: produto.lojaNome ?? null,
  }
}

export async function buscarProdutosLojaRemotos(): Promise<Produto[]> {
  try {
    console.log('🔍 [Catalogo] Buscando produtos remotos do Supabase...')
    const { data, error } = await supabase
      .from(TABELA_PRODUTOS_LOJA)
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('❌ [Catalogo] Erro ao buscar:', error)
      throw error
    }

    console.log(`✅ [Catalogo] ${data?.length ?? 0} produtos encontrados no Supabase`)
    return (data ?? []).map((row) => mapearProdutoRemoto(row as Record<string, unknown>))
  } catch (err: any) {
    console.error('❌ [Catalogo] Erro completo ao buscar:', err)
    throw err
  }
}

export async function sincronizarProdutosLojaComSupabase(): Promise<Produto[]> {
  try {
    const produtosRemotos = await buscarProdutosLojaRemotos()
    salvarProdutosLojaLocal(produtosRemotos)
    return produtosRemotos
  } catch (err) {
    console.warn('⚠️ [Catalogo] Falha na sincronização, usando cache local')
    throw err
  }
}

export async function salvarProdutoLojaNoSupabase(produto: Produto): Promise<void> {
  const payload = mapearProdutoParaRemoto(produto)
  
  console.log('📝 [Catalogo] Salvando produto:', {
    id: produto.id,
    nome: produto.nome,
    ownerId: produto.ownerId,
    payload: payload
  })

  const { data, error } = await supabase
    .from(TABELA_PRODUTOS_LOJA)
    .upsert([payload], { onConflict: 'id' })
    .select()

  if (error) {
    console.error('❌ [Catalogo] Erro ao salvar produto:', error)
    throw new Error(`Erro ao salvar: ${error.message || error.code || JSON.stringify(error)}`)
  }

  console.log('✅ [Catalogo] Produto salvo com sucesso:', data)
}

export async function removerProdutoLojaDoSupabase(id: number): Promise<void> {
  console.log(`🗑️  [Catalogo] Removendo produto ${id}...`)

  const { error } = await supabase
    .from(TABELA_PRODUTOS_LOJA)
    .delete()
    .eq('id', id)

  if (error) {
    console.error(`❌ [Catalogo] Erro ao remover produto ${id}:`, error)
    throw new Error(`Erro ao remover: ${error.message || error.code || JSON.stringify(error)}`)
  }

  console.log(`✅ [Catalogo] Produto ${id} removido com sucesso`)
}

export function getProximoIdCatalogo(produtosLoja: Produto[] = []): number {
  const todosIds = [...produtosBase, ...produtosLoja].map((produto) => produto.id)
  const proximoId = todosIds.length > 0 ? Math.max(...todosIds) + 1 : 1
  console.log('[Catalogo] Próximo ID gerado:', proximoId)
  return proximoId
}
