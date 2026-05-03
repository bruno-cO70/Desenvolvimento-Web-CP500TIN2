import type { Produto } from '@/types'

interface ResultadoBusca {
  produto: Produto
  score: number
}

interface SugestaoBusca {
  id: number
  nome: string
  categoria: Produto['categoria']
  label: string
  score: number
}

function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function distanciaLevenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  const matriz: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0))

  for (let i = 0; i <= a.length; i++) matriz[i]![0] = i
  for (let j = 0; j <= b.length; j++) matriz[0]![j] = j

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const custo = a[i - 1] === b[j - 1] ? 0 : 1
      const row = matriz[i]
      const prevRow = matriz[i - 1]
      if (row && prevRow) {
        row[j] = Math.min(
          prevRow[j]! + 1,
          row[j - 1]! + 1,
          prevRow[j - 1]! + custo,
        )
      }
    }
  }

  return matriz[a.length]?.[b.length] ?? 0
}

function gerarCamposBusca(produto: Produto): string[] {
  return [
    produto.nome,
    produto.label,
    produto.categoria,
    produto.descricao ?? '',
    produto.origem ?? '',
    produto.regiao ?? '',
    produto.pais ?? '',
    produto.notas ?? '',
    produto.harmonizacao ?? '',
    produto.uvasPrincipais ?? '',
  ]
}

function scoreProduto(produto: Produto, termoBusca: string): number {
  const termoNormalizado = normalizarTexto(termoBusca)
  if (!termoNormalizado) return 0

  const termos = termoNormalizado.split(/\s+/).filter(Boolean)
  const nomeNormalizado = normalizarTexto(produto.nome)
  const camposNormalizados = gerarCamposBusca(produto).map(normalizarTexto)
  const blocoCompleto = camposNormalizados.join(' ')

  let score = 0

  if (nomeNormalizado === termoNormalizado) score += 120
  if (nomeNormalizado.startsWith(termoNormalizado)) score += 80
  if (nomeNormalizado.includes(termoNormalizado)) score += 60
  if (blocoCompleto.includes(termoNormalizado)) score += 25

  const palavrasNome = nomeNormalizado.split(/\s+/).filter(Boolean)

  for (const termo of termos) {
    if (nomeNormalizado.includes(termo)) {
      score += 24
      continue
    }

    const matchCampo = camposNormalizados.some(campo => campo.includes(termo))
    if (matchCampo) {
      score += 12
      continue
    }

    const fuzzy = palavrasNome.some(palavra => {
      if (Math.abs(palavra.length - termo.length) > 1) return false
      return distanciaLevenshtein(palavra, termo) <= 1
    })

    if (fuzzy) score += 8
  }

  return score
}

export function useSmartSearch() {
  function rankProducts(produtos: Produto[], termoBusca: string): ResultadoBusca[] {
    const termo = termoBusca.trim()
    if (!termo) return produtos.map(produto => ({ produto, score: 0 }))

    return produtos
      .map(produto => ({ produto, score: scoreProduto(produto, termo) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
  }

  function getSuggestions(produtos: Produto[], termoBusca: string, limite = 6): SugestaoBusca[] {
    const termo = termoBusca.trim()
    if (termo.length < 2) return []

    const ranqueados = rankProducts(produtos, termo)
    const sugestoesPorId = new Map<number, SugestaoBusca>()

    for (const item of ranqueados) {
      if (sugestoesPorId.size >= limite) break
      sugestoesPorId.set(item.produto.id, {
        id: item.produto.id,
        nome: item.produto.nome,
        categoria: item.produto.categoria,
        label: item.produto.label,
        score: item.score,
      })
    }

    if (sugestoesPorId.size < limite) {
      const termoNormalizado = normalizarTexto(termo)
      const palavras = termoNormalizado.split(/\s+/).filter(Boolean)

      const complementares = produtos.filter(produto => {
        if (sugestoesPorId.has(produto.id)) return false

        const campos = [produto.nome, produto.label, produto.categoria].map(normalizarTexto)
        return palavras.every(palavra => campos.some(campo => campo.includes(palavra)))
      })

      for (const produto of complementares) {
        if (sugestoesPorId.size >= limite) break
        sugestoesPorId.set(produto.id, {
          id: produto.id,
          nome: produto.nome,
          categoria: produto.categoria,
          label: produto.label,
          score: 1,
        })
      }
    }

    return Array.from(sugestoesPorId.values())
  }

  return {
    rankProducts,
    getSuggestions,
  }
}