# 🚀 Desenvolvimento Web - CP500TIN2 | Projeto BevShop

Este repositório documenta a evolução técnica durante a disciplina de **Desenvolvimento Web** (Turma CP500TIN2). O que começou com a estruturação básica de páginas HTML evoluiu para a construção de uma aplicação Full-Stack completa e moderna: a **BevShop**.

## 🍷 Sobre o Projeto Principal (BevShop)

A **BevShop** é um e-commerce de bebidas premium desenvolvido como projeto prático para consolidar os conhecimentos da disciplina. A aplicação simula uma experiência de compra real, desde a seleção de produtos no carrinho até o checkout seguro com integração de pagamentos e registro no banco de dados.

### ✨ Principais Funcionalidades
* Catálogo dinâmico de produtos.
* Gerenciamento de estado (Carrinho de compras inteligente).
* Checkout integrado com a API do **Stripe** (simulação de cartão de crédito e PIX).
* Banco de dados em nuvem para registro do histórico de pedidos.

---

## 🛠️ Tecnologias e Arquitetura

O projeto foi dividido em Front-end e Back-end, utilizando o que há de mais moderno no ecossistema JavaScript:

**Front-end (Interface da Loja):**
* **Vue.js 3 & TypeScript:** Criação de interfaces reativas e tipagem segura.
* **Vite:** Ferramenta de build super rápida.
* **Tailwind CSS:** Estilização moderna, responsiva e direta no HTML.
* **Pinia & Vue Router:** Gerenciamento do carrinho e navegação entre páginas.

**Back-end & Infraestrutura:**
* **Node.js & Express:** Servidor back-end para processar a lógica de pagamentos de forma segura.
* **Supabase:** Banco de dados relacional (BaaS) para armazenar os pedidos dos clientes.
* **Stripe API:** Gateway de processamento de pagamentos.

**Deploy (Hospedagem):**
* **Vercel:** Hospedagem do Front-end.
* **Render:** Hospedagem do Servidor Back-end.

---

## 📂 Estrutura do Repositório

O repositório está organizado para separar a interface do servidor:

```text
├── bevshop-vue/          # Código fonte do Front-end (Loja)
├── bevshop-api/          # Servidor Node.js para processar o Stripe
└── aulas-anteriores/     # Exercícios práticos de introdução ao HTML/CSS