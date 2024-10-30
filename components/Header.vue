<template>
    <div ref="headerContainer">
        <header :class="[
            'right-0 top-0 z-40 flex items-center justify-between gap-2 bg-white px-6 py-3 pt-12 shadow-[0_3px_2px_0_rgba(0,_0,_0,_0.10)] transition-all lg:z-20 lg:ml-auto lg:py-4 w-acalc(100%-0px) lg:w-acalc(100%-222px)',
            isMenuOpen ? 'lg:pl-[222px]' : 'lg:pl-6',
            'lg:pl-[222px]',
            { 'fixed': isMobile, 'sticky lg:fixed': !isMobile },
            { '-translate-y-full': isHidden && !isAtTop && isMobile },
            'transition-transform duration-300'
        ]">
            <button @click="$emit('toggle-menu')" :aria-label="t('header.menu.toggle')" class="lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            <div class="flex items-center justify-center relative">
                <div class="lg:hidden flex items-center gap-1">
                    <img src="https://md.sirius.expert/img/sirius_logo_halloween.png" :alt="t('header.logo.alt')"
                        class="h-11 w-11" />
                    <div class="text-xl font-black uppercase">SIRIUS</div>
                </div>
                <div class="hidden lg:flex items-center gap-1">
                    <img src="https://md.sirius.expert/img/sirius_logo_halloween.png" :alt="t('header.logo.alt')"
                        class="h-11 w-11" />
                    <div class="text-xl font-black uppercase">SIRIUS</div>
                </div>
            </div>

            <div class="relative flex select-none items-center justify-start space-x-2 text-sm">
                <div class="input relative !p-0 !border-none bg-transparent">
                    <button @click="toggleLanguageDropdown" :aria-label="t('header.languages.select')"
                        class="flex w-full items-center justify-between space-x-2 text-start">
                        <div class="flex items-center justify-center space-x-2">
                            <img :alt="`Flag ${currentLocale}`"
                                :src="`https://md.sirius.expert/img/flag_${currentLocale}.svg`">
                            <span class="hidden lg:block">{{ t(`header.languages.${currentLocale}`) }}</span>
                        </div>
                        <i class="i-ic-baseline-arrow-drop-down h-4 w-4"></i>
                    </button>

                    <div v-if="isLanguageDropdownOpen"
                        class="absolute top-full right-0 mt-1 w-32 bg-white rounded shadow-md z-50">
                        <div v-for="code in ['en', 'ro', 'ru']" :key="code" @click="selectLanguage(code)"
                            class="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                            <img :alt="`Flag ${code}`" :src="`https://md.sirius.expert/img/flag_${code}.svg`">
                            <span>{{ t(`header.languages.${code}`) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const props = defineProps({
    isMenuOpen: Boolean
})

const header = ref(null)
const headerContainer = ref(null)
const isHidden = ref(false)
const isAtTop = ref(true)
let lastScrollY = 0
const { width } = useWindowSize()
const isMobile = ref(width.value < 1024)

watch(width, (newWidth) => {
    isMobile.value = newWidth < 1024
})

const handleScroll = () => {
    const currentScrollY = window.scrollY
    isAtTop.value = currentScrollY <= 0
    isHidden.value = currentScrollY > lastScrollY
    lastScrollY = currentScrollY
}

const currentLocale = ref(locale.value)
const isLanguageDropdownOpen = ref(false)

const toggleLanguageDropdown = () => {
    isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
}

const selectLanguage = (lang) => {
    locale.value = lang
    currentLocale.value = lang
    isLanguageDropdownOpen.value = false
}

const handleClickOutside = (event) => {
    const input = event.target.closest('.input')
    const dropdown = event.target.closest('.language-dropdown')

    if (!input && !dropdown && isLanguageDropdownOpen.value) {
        isLanguageDropdownOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('scroll', handleScroll)
})
</script>