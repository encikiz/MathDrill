import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { worksheetService } from '../services/api';
import type { Worksheet } from '../services/api';

export const useWorksheetStore = defineStore('worksheet', () => {
  // State
  const worksheets = ref<Worksheet[]>([]);
  const currentWorksheet = ref<Worksheet | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getWorksheetById = computed(() => {
    return (id: string) => worksheets.value.find(worksheet => worksheet._id === id);
  });

  const getWorksheetsByDifficulty = computed(() => {
    return (difficulty: string) => worksheets.value.filter(worksheet => worksheet.difficulty === difficulty);
  });

  // Actions
  async function fetchWorksheets() {
    loading.value = true;
    error.value = null;

    try {
      worksheets.value = await worksheetService.getWorksheets();
    } catch (err) {
      error.value = 'Failed to fetch worksheets. Please try again later.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchWorksheetById(id: string) {
    loading.value = true;
    error.value = null;

    try {
      currentWorksheet.value = await worksheetService.getWorksheetById(id);
      return currentWorksheet.value;
    } catch (err) {
      error.value = `Failed to fetch worksheet with ID: ${id}. Please try again later.`;
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function fetchWorksheetWithAnswers(id: string) {
    loading.value = true;
    error.value = null;

    try {
      const worksheetWithAnswers = await worksheetService.getWorksheetWithAnswers(id);
      return worksheetWithAnswers;
    } catch (err) {
      error.value = `Failed to fetch worksheet answers for ID: ${id}. Please try again later.`;
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  function clearCurrentWorksheet() {
    currentWorksheet.value = null;
  }

  return {
    // State
    worksheets,
    currentWorksheet,
    loading,
    error,

    // Getters
    getWorksheetById,
    getWorksheetsByDifficulty,

    // Actions
    fetchWorksheets,
    fetchWorksheetById,
    fetchWorksheetWithAnswers,
    clearCurrentWorksheet
  };
});
