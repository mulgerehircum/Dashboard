<template>
  <NuxtLayout>
    <NuxtErrorBoundary>
      <NuxtPage />
      
      <template #error="{ error }">
        <div>
          <error-page :error="error" />
        </div>
      </template>
    </NuxtErrorBoundary>
  </NuxtLayout>
</template>