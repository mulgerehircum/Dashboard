<template>
  <transition name="slide">
    <aside v-if="isOpen || !isMobile"
      class="bg-primary-light alg:top-10 fixed left-0 top-0 z-50 h-full transition-all w-a0px lg:w-[222px]">
      <div class="w-[222px] lg:pb-[200px] h-full overflow-y-auto pb-12 pt-[24px]">
        <!-- LOGO -->
        <div class="flex items-center justify-center space-x-4 px-6">
          <a href="/" aria-label="Go to homepage"
            class="router-link-active router-link-exact-active flex items-center gap-1 flex justify-center">
            <img src="https://md.sirius.expert/img/sirius_logo_halloween.png" alt="Sirius Logo" class="h-11 w-11" />
            <div class="text-xl font-black uppercase">SIRIUS</div>
          </a>
        </div>
        <!-- NAV -->
        <nav class="mt-8 flex flex-col items-center pl-0 px-0">
          <a aria-current="page" href="/"
            class="bg-primary-blue-4 text-white router-link-exact-active btn-sidebar w-full justify-start  justify-center"><i
              class="i-ic-outline-dashboard block bg-white h-6 w-6 min-w-6"></i><span
              class="whitespace-nowrap block lg:hidden">Dashboard</span></a>
          <a href="/settings" class="btn-sidebar mt-6 w-full justify-start  justify-center"><i
              class="i-ic-baseline-list-alt block h-6 w-6 min-w-6"></i><span
              class="whitespace-nowrap  lg:hidden ">Invoices</span></a>
          <a href="/profile" class="btn-sidebar w-full justify-start  justify-center"><i
              class="i-ic-outline-payments block h-6 w-6 min-w-6"></i><span
              class="whitespace-nowrap  lg:hidden ">Payments</span></a>
        </nav>
      </div>
    </aside>
  </transition>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue'
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isOpen'])
const internalIsOpen = ref(props.isOpen)
const isMobile = ref(false)
const { width } = useWindowSize()

const handleClickOutside = (event) => {
  if (isMobile.value && internalIsOpen.value && 
      !event.target.closest('.bg-primary-light') && 
      !event.target.closest('button')) {
    emit('update:isOpen', false)
  }
}
const handleScroll = () => {
  if (isMobile.value && internalIsOpen.value) {
    emit('update:isOpen', false)
  }
}
onMounted(() => {
  isMobile.value = width.value < 1024
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)

})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)

})

watch(width, (newWidth) => {
  isMobile.value = newWidth < 1024
})

watch(() => props.isOpen, (newVal) => {
  internalIsOpen.value = newVal
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>