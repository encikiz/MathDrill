<script setup lang="ts">
import Worksheet from '../components/Worksheet.vue'
</script>

<template>
  <main>
    <div class="header">
      <div class="logo-container">
        <img src="@/assets/logo.svg" alt="MathDrill Logo" class="logo" />
      </div>
      <h1 class="app-title">MathDrill</h1>
      <p class="app-subtitle">Interactive Math Worksheets</p>
    </div>
    <div class="worksheet-container glass-card">
      <Worksheet />
    </div>
    <footer class="footer">
      <p>© 2025 MathDrill - Enhance your math skills with interactive worksheets</p>
    </footer>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  animation: fadeIn 1s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  margin-bottom: var(--spacing-md);
  position: relative;
}

.logo {
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  animation: pulse 3s infinite ease-in-out;
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
  text-shadow: 0 2px 10px rgba(10, 132, 255, 0.3);
}

.app-subtitle {
  color: var(--text-color-secondary);
  font-size: 1.1rem;
  margin-top: 0;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.worksheet-container {
  margin-bottom: var(--spacing-lg);
  animation: slideUp 0.8s ease-out;
  width: 100%;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.footer {
  text-align: center;
  color: var(--text-color-tertiary);
  font-size: 0.8rem;
  margin-bottom: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  width: 100%;
  max-width: 600px;
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

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Desktop styles - more compact layout */
@media (min-width: 1024px) {
  main {
    max-width: 700px;
    padding: 0;
  }

  .header {
    margin-bottom: var(--spacing-md);
  }

  .logo {
    width: 80px;
    height: 80px;
  }

  .app-title {
    font-size: 2.2rem;
  }

  .worksheet-container {
    padding: 0;
  }
}

/* Responsive styles for mobile */
@media (max-width: 768px) {
  .app-title {
    font-size: 2rem;
  }

  .app-subtitle {
    font-size: 1rem;
  }

  .logo {
    width: 80px;
    height: 80px;
  }
}
</style>
