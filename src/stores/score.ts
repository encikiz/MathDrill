import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { scoreService } from '../services/api';
import type { Score, ScoreSubmission } from '../services/api';

export const useScoreStore = defineStore('score', () => {
  // State
  const scores = ref<Score[]>([]);
  const topScores = ref<Score[]>([]);
  const worksheetScores = ref<Score[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastSubmittedScore = ref<Score | null>(null);

  // Getters
  const getScoresByUser = computed(() => {
    return (userName: string) => scores.value.filter(score => score.userName === userName);
  });

  // Actions
  async function fetchAllScores() {
    loading.value = true;
    error.value = null;

    try {
      scores.value = await scoreService.getScores();
    } catch (err) {
      error.value = 'Failed to fetch scores. Please try again later.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchTopScores(limit: number = 10) {
    loading.value = true;
    error.value = null;

    try {
      topScores.value = await scoreService.getTopScores(limit);
    } catch (err) {
      error.value = 'Failed to fetch top scores. Please try again later.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchScoresByWorksheet(worksheetId: string) {
    loading.value = true;
    error.value = null;

    try {
      worksheetScores.value = await scoreService.getScoresByWorksheet(worksheetId);
    } catch (err) {
      error.value = `Failed to fetch scores for worksheet ID: ${worksheetId}. Please try again later.`;
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function submitScore(scoreData: ScoreSubmission) {
    loading.value = true;
    error.value = null;

    try {
      lastSubmittedScore.value = await scoreService.submitScore(scoreData);

      // Update the scores list if we have it loaded
      if (scores.value.length > 0) {
        scores.value = [...scores.value, lastSubmittedScore.value];
      }

      // Update worksheet scores if we're viewing that worksheet's scores
      if (worksheetScores.value.length > 0 && scoreData.worksheetId === (worksheetScores.value[0].worksheetId as string)) {
        worksheetScores.value = [...worksheetScores.value, lastSubmittedScore.value];
      }

      return lastSubmittedScore.value;
    } catch (err) {
      error.value = 'Failed to submit score. Please try again later.';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  function clearScores() {
    scores.value = [];
    topScores.value = [];
    worksheetScores.value = [];
    lastSubmittedScore.value = null;
  }

  return {
    // State
    scores,
    topScores,
    worksheetScores,
    loading,
    error,
    lastSubmittedScore,

    // Getters
    getScoresByUser,

    // Actions
    fetchAllScores,
    fetchTopScores,
    fetchScoresByWorksheet,
    submitScore,
    clearScores
  };
});
