<template>
  <div class="flex">
      <SideBar v-model:isOpen="isMenuOpen" />
      <div class="flex-1 transition-all" 
           :class="[
               isMenuOpen ? 'ml-[222px]' : 'ml-0', // mobile behavior
           ]">
          <Header :isMenuOpen="isMenuOpen" @toggle-menu="toggleMenu" />
          <NuxtPage />
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleClickOutside = (event) => {
  if (isMenuOpen.value && !event.target.closest('.bg-primary-light') && !event.target.closest('button')) {
      isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.flex-1 {
  min-height: 100vh;
}
</style>