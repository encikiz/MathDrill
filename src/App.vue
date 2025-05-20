<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Add subtle animation for background */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

body {
  background-size: 200% 200%;
  animation: gradientAnimation 15s ease infinite;
}
</style>
