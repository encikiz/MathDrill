<template>
  <div class="leaderboard">
    <h2 class="leaderboard-title">{{ title }}</h2>

    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading scores...</p>
    </div>

    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchScores" class="btn btn-primary">Try Again</button>
    </div>

    <div v-else-if="scores.length === 0" class="empty-state">
      <p>No scores available yet. Be the first to complete this worksheet!</p>
    </div>

    <div v-else class="scores-table-container">
      <table class="scores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in scores" :key="score._id" :class="{ 'highlight': isCurrentUser(score) }">
            <td class="rank">{{ index + 1 }}</td>
            <td class="name">{{ score.userName }}</td>
            <td class="score">{{ score.score }}/{{ score.totalQuestions }}</td>
            <td class="time">{{ formatTime(score.timeSpent) }}</td>
            <td class="date">{{ formatDate(score.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue';
import { useScoreStore } from '../stores/score';
import type { Score } from '../services/api';

const props = defineProps({
  worksheetId: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 10
  },
  title: {
    type: String,
    default: 'Leaderboard'
  }
});

const scoreStore = useScoreStore();
const { loading, error } = scoreStore;

const scores = computed(() => {
  if (props.worksheetId) {
    return scoreStore.worksheetScores;
  } else {
    return scoreStore.topScores;
  }
});

// Format time from seconds to minutes and seconds
const formatTime = (seconds: number): string => {
  if (!seconds) return '-';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  } else {
    return `${minutes}m ${remainingSeconds}s`;
  }
};

// Format date to a readable format
const formatDate = (dateString?: string): string => {
  if (!dateString) return '-';

  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Check if the score belongs to the current user
const isCurrentUser = (score: Score): boolean => {
  const lastSubmittedScore = scoreStore.lastSubmittedScore;
  return lastSubmittedScore?._id === score._id;
};

const fetchScores = async () => {
  if (props.worksheetId) {
    await scoreStore.fetchScoresByWorksheet(props.worksheetId);
  } else {
    await scoreStore.fetchTopScores(props.limit);
  }
};

onMounted(() => {
  fetchScores();
});
</script>

<style scoped>
.leaderboard {
  width: 100%;
  padding: var(--spacing-md);
}

.leaderboard-title {
  text-align: center;
  margin-bottom: var(--spacing-md);
  color: var(--text-color);
  font-weight: 600;
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.leaderboard-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
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

.scores-table-container {
  overflow-x: auto;
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.scores-table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--bg-color-secondary);
}

.scores-table th,
.scores-table td {
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
}

.scores-table th {
  background-color: var(--bg-color-tertiary);
  color: var(--text-color-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.scores-table tr {
  border-bottom: 1px solid var(--border-color);
  transition: background-color var(--transition-fast);
}

.scores-table tr:last-child {
  border-bottom: none;
}

.scores-table tr:hover {
  background-color: var(--bg-color-tertiary);
}

.scores-table tr.highlight {
  background-color: rgba(10, 132, 255, 0.1);
}

.rank {
  font-weight: 600;
  color: var(--text-color);
  width: 60px;
}

.name {
  font-weight: 500;
  color: var(--text-color);
}

.score {
  font-weight: 600;
  color: var(--primary-color);
}

.time, .date {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .scores-table th,
  .scores-table td {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.9rem;
  }

  .date {
    display: none;
  }
}
</style>
