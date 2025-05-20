<script setup lang="ts">
import Worksheet from '../components/Worksheet.vue'
</script>

<template>
  <main>
    <div class="header">
      <h1 class="app-title">MathDrill</h1>
      <p class="app-subtitle">Interactive Math Worksheets</p>
    </div>
    <div class="worksheet-container glass-card">
      <Worksheet />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  max-width: 900px;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 1s ease-out;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, var(--primary-color), #64aaff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.app-subtitle {
  color: var(--text-color-secondary);
  font-size: 1.1rem;
  margin-top: 0;
}

.worksheet-container {
  margin-bottom: var(--spacing-xl);
  animation: slideUp 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .app-title {
    font-size: 2rem;
  }

  .app-subtitle {
    font-size: 1rem;
  }
}
</style>
