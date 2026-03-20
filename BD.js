// 1. Inicialize o Supabase com as suas credenciais (Cole as chaves do Passo 1 aqui)
const SUPABASE_URL = 'https://ezytybxzenfyrsecwpta.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6eXR5Ynh6ZW5meXJzZWN3cHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NDA3ODksImV4cCI6MjA4OTExNjc4OX0.eOieZBtwJd8SyA1neBtYY5XlJL520-uqqSnriW4X9rY';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Função para Cadastrar um novo usuário no Banco
async function cadastrar() {
    const nomeInput = document.getElementById('register-nome').value;
    const emailInput = document.getElementById('register-email').value;
    const senhaInput = document.getElementById('register-senha').value;

    const { data, error } = await supabaseClient.auth.signUp({
        email: emailInput,
        password: senhaInput,
        options: {
            data: {
                nome: nomeInput,
            },
        },
    });

    if (error) {
        document.getElementById('mensagem-register').style.color = '#f87171';
        document.getElementById('mensagem-register').innerText = "Erro ao cadastrar: " + error.message;
    } else {
        document.getElementById('mensagem-register').style.color = '#4ade80';
        document.getElementById('mensagem-register').innerText = "Cadastro realizado! Verifique seu e-mail para confirmar.";
    }
}

// 3. Função para Fazer Login
async function entrar() {
    const emailInput = document.getElementById('login-email').value;
    const senhaInput = document.getElementById('login-senha').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: emailInput,
        password: senhaInput,
    });

    if (error) {
        document.getElementById('mensagem-login').style.color = '#f87171';
        document.getElementById('mensagem-login').innerText = "Erro ao entrar: Verifique e-mail e senha.";
    } else {
        document.getElementById('mensagem-login').style.color = '#4ade80';
        document.getElementById('mensagem-login').innerText = "Login feito com sucesso! Bem-vindo.";
        console.log("Dados do usuário logado:", data);
        
        // Redirecionar o usuário para a página de perfil
        window.location.href = "https://desenvolvimento-web-wine-nine.vercel.app/index.html";
    }
}