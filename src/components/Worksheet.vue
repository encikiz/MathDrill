<template>
  <div class="worksheet">
    <h1 class="worksheet-title">{{ worksheetData.title }}</h1>
    
    <div class="student-info">
      <div class="name-field">
        <label for="student-name">Name:</label>
        <input 
          id="student-name" 
          v-model="studentName" 
          type="text" 
          placeholder="Enter your name"
        />
      </div>
      <div class="score-field">
        <label>Score:</label>
        <span class="score">{{ score !== null ? score : '___' }}/12</span>
      </div>
    </div>
    
    <p class="instructions">Circle the correct answers.</p>
    
    <div class="questions">
      <div 
        v-for="(question, qIndex) in worksheetData.questions" 
        :key="qIndex"
        class="question-container"
      >
        <p class="question">{{ question.question }}</p>
        <div class="options">
          <div 
            v-for="(option, oIndex) in question.options" 
            :key="oIndex"
            class="option"
          >
            <label :class="{ selected: selectedAnswers[qIndex] === oIndex }">
              <input 
                type="radio" 
                :name="`question-${qIndex}`" 
                :value="oIndex" 
                v-model="selectedAnswers[qIndex]"
              />
              <span class="option-label">{{ ['a', 'b', 'c'][oIndex] }}.</span>
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    
    <div class="actions">
      <button @click="resetWorksheet" class="reset-btn">Reset</button>
      <button @click="calculateScore" class="submit-btn">Submit</button>
    </div>
    
    <div class="copyright">
      <a :href="'https://' + worksheetData.copyright" target="_blank">{{ worksheetData.copyright }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import worksheetData from '../data/worksheetData';

const studentName = ref('');
const selectedAnswers = ref<number[]>(Array(worksheetData.questions.length).fill(null));
const score = ref<number | null>(null);

const calculateScore = () => {
  if (!studentName.value.trim()) {
    alert('Please enter your name before submitting.');
    return;
  }
  
  let correctCount = 0;
  
  worksheetData.questions.forEach((question, index) => {
    if (selectedAnswers.value[index] === question.correctAnswer) {
      correctCount++;
    }
  });
  
  score.value = correctCount;
};

const resetWorksheet = () => {
  studentName.value = '';
  selectedAnswers.value = Array(worksheetData.questions.length).fill(null);
  score.value = null;
};
</script>

<style scoped>
.worksheet {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.worksheet-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.student-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.name-field, .score-field {
  display: flex;
  align-items: center;
}

.name-field label, .score-field label {
  margin-right: 10px;
  font-weight: bold;
}

.name-field input {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.score {
  font-weight: bold;
  min-width: 50px;
  display: inline-block;
}

.instructions {
  margin-bottom: 20px;
  font-style: italic;
}

.question-container {
  margin-bottom: 30px;
}

.question {
  font-weight: bold;
  margin-bottom: 10px;
}

.options {
  margin-left: 20px;
}

.option {
  margin-bottom: 8px;
}

.option label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.option label:hover {
  background-color: #f5f5f5;
}

.option label.selected {
  background-color: #e6f7ff;
}

.option input[type="radio"] {
  display: none;
}

.option-label {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.selected .option-label {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.reset-btn {
  background-color: #f5f5f5;
  color: #333;
}

.reset-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn {
  background-color: #1890ff;
  color: white;
}

.submit-btn:hover {
  background-color: #40a9ff;
}

.copyright {
  text-align: center;
  margin-top: 30px;
  font-size: 0.8em;
  color: #888;
}

.copyright a {
  color: #888;
  text-decoration: none;
}

.copyright a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .student-info {
    flex-direction: column;
    gap: 10px;
  }
  
  .name-field input {
    width: 100%;
  }
}
</style>
