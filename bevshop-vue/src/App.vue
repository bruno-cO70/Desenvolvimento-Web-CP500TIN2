<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import CartSidebar from './components/CartSidebar.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'
</script>

<template>
  <div class="bg-[#101922] text-slate-100 min-h-screen flex flex-col">
    <AppHeader />
    <RouterView />
    <CartSidebar />
    <ScrollToTopButton />
  </div>
</template>