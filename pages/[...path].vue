<template>
    <div class="min-h-screen space-y-12 pt-16 lg:pt-0 px-5">
      <div class="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div class="text-center">
            <i class="i-ic-outline-error-outline text-primary-blue-4 h-32 w-32 mb-8 block mx-auto"></i>

          
          <h1 class="text-4xl font-bold text-primary-dark mb-4">
            Oops! Page Not Found
          </h1>
          <p class="text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. Please check the URL or return to homepage.
          </p>
          
          <div class="flex gap-4 justify-center">
            <NuxtLink 
              to="/"
              class="bg-primary-blue-4 text-white px-6 py-3 rounded-md hover:bg-primary-blue-3 transition-colors"
            >
              Back to Home
            </NuxtLink>
            <button 
              @click="() => window.history.back()"
              class="border border-primary-blue-4 text-primary-blue-4 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    validate: async () => {
      return false
    }
  })
  </script>