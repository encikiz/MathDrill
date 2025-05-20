<template>
  <div class="worksheet-list">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading worksheets...</p>
    </div>

    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchWorksheets" class="btn btn-primary">Try Again</button>
    </div>

    <div v-else-if="worksheets.length === 0" class="empty-state">
      <p>No worksheets available.</p>
    </div>

    <div v-else class="worksheets-grid">
      <div
        v-for="worksheet in worksheets"
        :key="worksheet._id"
        class="worksheet-card"
        @click="selectWorksheet(worksheet._id)"
      >
        <div class="difficulty-badge" :class="worksheet.difficulty">
          {{ worksheet.difficulty }}
        </div>
        <h3 class="worksheet-title">{{ worksheet.title }}</h3>
        <p class="worksheet-description">{{ worksheet.description }}</p>
        <div class="worksheet-meta">
          <span class="question-count">{{ worksheet.questions.length }} questions</span>
          <span v-if="worksheet.timeLimit" class="time-limit">
            {{ formatTime(worksheet.timeLimit) }}
          </span>
        </div>
        <button class="btn btn-primary start-btn">Start</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useWorksheetStore } from '../stores/worksheet';

const worksheetStore = useWorksheetStore();
const router = useRouter();

const { worksheets, loading, error } = worksheetStore;

// Format time from seconds to minutes
const formatTime = (seconds: number): string => {
  if (seconds === 0) return 'No time limit';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  } else if (remainingSeconds === 0) {
    return `${minutes}m`;
  } else {
    return `${minutes}m ${remainingSeconds}s`;
  }
};

const fetchWorksheets = async () => {
  await worksheetStore.fetchWorksheets();
};

const selectWorksheet = (id: string) => {
  router.push(`/worksheet/${id}`);
};

onMounted(() => {
  fetchWorksheets();
});
</script>

<style scoped>
.worksheet-list {
  width: 100%;
  padding: var(--spacing-md);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(10, 132, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: var(--danger-color);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: var(--text-color-secondary);
}

.worksheets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.worksheet-card {
  background-color: var(--bg-color-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  transition: all var(--transition-fast);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.worksheet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.difficulty-badge {
  position: absolute;
  top: 0;
  right: 0;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0 var(--border-radius-md) 0 var(--border-radius-md);
}

.difficulty-badge.easy {
  background-color: rgba(48, 209, 88, 0.1);
  color: var(--success-color);
}

.difficulty-badge.medium {
  background-color: rgba(255, 214, 10, 0.1);
  color: var(--warning-color);
}

.difficulty-badge.hard {
  background-color: rgba(255, 69, 58, 0.1);
  color: var(--danger-color);
}

.worksheet-title {
  margin-top: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  font-size: 1.2rem;
  color: var(--text-color);
}

.worksheet-description {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
}

.worksheet-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  font-size: 0.8rem;
  color: var(--text-color-tertiary);
}

.start-btn {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.start-btn:hover {
  background-color: var(--primary-color-hover);
}

/* Responsive styles */
@media (max-width: 768px) {
  .worksheets-grid {
    grid-template-columns: 1fr;
  }
}
</style>
