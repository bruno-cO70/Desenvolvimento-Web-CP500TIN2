import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { TipoConta } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref<User | null>(null)
  const carregando = ref(true)

  async function inicializar() {
    const { data } = await supabase.auth.getUser()
    usuario.value = data.user
    carregando.value = false

    supabase.auth.onAuthStateChange((_event, session) => {
      usuario.value = session?.user ?? null
    })
  }

  async function login(email: string, senha: string): Promise<string | null> {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) return 'Verifique e-mail e senha.'
    return null
  }

  async function cadastrar(
    nome: string,
    email: string,
    senha: string,
    tipoConta: TipoConta = 'cliente'
  ): Promise<string | null> {
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome,
          tipo_conta: tipoConta,
          nome_loja: nome,
        },
      },
    })
    if (error) return error.message
    return null
  }

  async function logout() {
    await supabase.auth.signOut()
    usuario.value = null
  }
  async function recuperarSenha(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login',
    })
    if (error) return error.message
    return null
  }

  // Não esqueça de adicionar 'recuperarSenha' no return lá embaixo!
  return { usuario, carregando, inicializar, login, cadastrar, logout, recuperarSenha }
})