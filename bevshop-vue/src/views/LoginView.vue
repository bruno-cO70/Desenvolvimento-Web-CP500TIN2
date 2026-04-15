<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Controla se o usuário está na tela de 'login', 'register' ou 'forgot'
const mode = ref('login')

// Variáveis do formulário
const nome = ref('')
const email = ref('')
const senha = ref('')
const erroMsg = ref('')
const msgSucesso = ref('')
const loading = ref(false)

const alternarModo = (novoModo: string) => {
  mode.value = novoModo
  erroMsg.value = '' // Limpa os erros ao trocar de tela
  msgSucesso.value = '' // Limpa a mensagem de sucesso
}

const handleSubmit = async () => {
  erroMsg.value = ''
  msgSucesso.value = ''
  loading.value = true
  
  try {
    let erro = null;

    if (mode.value === 'login') {
      erro = await authStore.login(email.value, senha.value)
      if (erro) { erroMsg.value = erro; return; }
      router.push('/')
    } 
    else if (mode.value === 'register') {
      erro = await authStore.cadastrar(nome.value, email.value, senha.value)
      if (erro) { erroMsg.value = erro; return; }
      router.push('/')
    }
    else if (mode.value === 'forgot') {
      // Chama a função de recuperar senha que você adicionou na store
      erro = await authStore.recuperarSenha(email.value)
      if (erro) { erroMsg.value = erro; return; }
      msgSucesso.value = 'E-mail de recuperação enviado! Verifique sua caixa de entrada.'
    }
    
  } catch (error: any) {
    erroMsg.value = error.message || 'Ocorreu um erro ao processar sua solicitação.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex bg-[#101922] text-slate-100 font-display">
    
    <div class="hidden lg:flex w-1/2 bg-cover bg-center relative" style="background-image: url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop');">
      <div class="absolute inset-0 bg-gradient-to-t from-[#101922] via-[#101922]/40 to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-12">
        <h2 class="text-4xl font-black text-white mb-4">Descubra o Extraordinário.</h2>
        <p class="text-slate-300 text-lg max-w-md">Junte-se ao clube BevShop e tenha acesso a seleções exclusivas, ofertas antecipadas e muito mais.</p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative overflow-y-auto">
      
      <RouterLink to="/" class="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-slate-400 hover:text-[#d4af37] transition-colors text-sm font-medium">
        <span class="material-symbols-outlined text-[18px]">arrow_back</span> Voltar à loja
      </RouterLink>

      <div class="w-full max-w-md mt-12 lg:mt-0 transition-all duration-300">
        
        <div class="flex items-center gap-3 text-white mb-8 justify-center lg:justify-start">
          <div class="size-8 text-[#d4af37] flex items-center justify-center">
            <span class="material-symbols-outlined text-[32px]">local_bar</span>
          </div>
          <h1 class="text-3xl font-black tracking-tight">BevShop</h1>
        </div>

        <h2 class="text-2xl font-bold text-white mb-2">
          {{ mode === 'login' ? 'Bem-vindo(a) de volta' : (mode === 'register' ? 'Criar nova conta' : 'Recuperar Senha') }}
        </h2>
        <p class="text-slate-400 mb-8">
          {{ mode === 'login' ? 'Faça login para continuar suas compras.' : (mode === 'register' ? 'Preencha seus dados para se cadastrar.' : 'Digite seu e-mail e enviaremos um link para redefinir sua senha.') }}
        </p>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
          
          <label v-if="mode === 'register'" class="flex flex-col gap-1.5">
            <span class="text-sm font-medium text-slate-300">Nome Completo</span>
            <input v-model="nome" type="text" required class="rounded-xl border-slate-700 bg-slate-800/50 text-white focus:ring-[#d4af37] focus:border-[#d4af37] h-12 px-4 placeholder:text-slate-500" placeholder="Como quer ser chamado?" />
          </label>

          <label class="flex flex-col gap-1.5">
            <span class="text-sm font-medium text-slate-300">E-mail</span>
            <div class="relative">
              <input v-model="email" type="email" required class="rounded-xl border-slate-700 bg-slate-800/50 text-white focus:ring-[#d4af37] focus:border-[#d4af37] h-12 w-full pl-11 pr-4 placeholder:text-slate-500" placeholder="seu@email.com" />
              <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">mail</span>
            </div>
          </label>

          <label v-if="mode !== 'forgot'" class="flex flex-col gap-1.5">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-slate-300">Senha</span>
              <button v-if="mode === 'login'" type="button" @click="alternarModo('forgot')" class="text-xs text-[#d4af37] hover:underline font-medium">Esqueceu a senha?</button>
            </div>
            <div class="relative">
              <input v-model="senha" type="password" required minlength="6" class="rounded-xl border-slate-700 bg-slate-800/50 text-white focus:ring-[#d4af37] focus:border-[#d4af37] h-12 w-full pl-11 pr-4 placeholder:text-slate-500" placeholder="••••••••" />
              <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">lock</span>
            </div>
          </label>

          <p v-if="erroMsg" class="text-red-400 text-sm font-medium flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">error</span> {{ erroMsg }}
          </p>
          <p v-if="msgSucesso" class="text-green-400 text-sm font-medium flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">check_circle</span> {{ msgSucesso }}
          </p>

          <button type="submit" :disabled="loading" class="w-full flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#d4af37]/90 text-slate-900 rounded-xl h-12 font-bold transition-all mt-2 disabled:opacity-50">
            {{ loading ? 'Processando...' : (mode === 'login' ? 'Entrar' : (mode === 'register' ? 'Criar Conta' : 'Enviar E-mail')) }}
          </button>
        </form>
        
        <div class="text-center text-sm text-slate-400 mt-6">
          <template v-if="mode === 'login'">
            Ainda não tem uma conta? <button type="button" @click="alternarModo('register')" class="text-[#d4af37] font-bold hover:underline">Criar conta</button>
          </template>
          <template v-else-if="mode === 'register'">
            Já tem uma conta? <button type="button" @click="alternarModo('login')" class="text-[#d4af37] font-bold hover:underline">Faça login</button>
          </template>
          <template v-else>
            Lembrou a senha? <button type="button" @click="alternarModo('login')" class="text-[#d4af37] font-bold hover:underline">Voltar para o login</button>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>