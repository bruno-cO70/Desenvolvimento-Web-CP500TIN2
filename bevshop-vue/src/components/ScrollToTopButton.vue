<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// Componente para o botão de "Scroll to Top"

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <transition name="fade">
      <button
      v-if="showButton"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#d4af37] hover:bg-slate-800 text-slate-900 hover:text-white shadow-lg flex items-center justify-center transition-colors duration-200"
      aria-label="Voltar ao topo"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
      </svg>
    </button>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
