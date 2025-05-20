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
                @change="animateSelection(qIndex, oIndex)"
              />
              <span class="option-label">{{ ['a', 'b', 'c'][oIndex] }}.</span>
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button @click="resetWorksheet" class="btn btn-secondary reset-btn">Reset</button>
      <button @click="calculateScore" class="btn btn-primary submit-btn">Submit</button>
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

  // Set the score
  score.value = correctCount;

  // Add animation to the score display
  setTimeout(() => {
    const scoreElement = document.querySelector('.score');
    if (scoreElement) {
      scoreElement.classList.add('score-animation');

      // Remove the animation class after it completes
      setTimeout(() => {
        scoreElement.classList.remove('score-animation');
      }, 1000);
    }
  }, 100);
};

const resetWorksheet = () => {
  studentName.value = '';
  selectedAnswers.value = Array(worksheetData.questions.length).fill(null);
  score.value = null;
};

const animateSelection = (questionIndex, optionIndex) => {
  // This function will be used to add visual feedback when an option is selected
  const optionElements = document.querySelectorAll(`.question-container:nth-child(${questionIndex + 1}) .option-label`);

  if (optionElements && optionElements[optionIndex]) {
    // Add a temporary animation class
    optionElements[optionIndex].classList.add('pulse-animation');

    // Remove the class after the animation completes
    setTimeout(() => {
      optionElements[optionIndex].classList.remove('pulse-animation');
    }, 600);
  }
};
</script>

<style scoped>
.worksheet {
  width: 100%;
  padding: var(--spacing-md);
}

.worksheet-title {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  color: var(--text-color);
  font-weight: 600;
  font-size: 1.5rem;
}

.student-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.name-field, .score-field {
  display: flex;
  align-items: center;
}

.name-field label, .score-field label {
  margin-right: var(--spacing-sm);
  font-weight: 500;
  color: var(--text-color-secondary);
}

.name-field input {
  width: 200px;
}

.score {
  font-weight: 600;
  min-width: 50px;
  display: inline-block;
  color: var(--primary-color);
}

.instructions {
  margin-bottom: var(--spacing-lg);
  font-style: italic;
  color: var(--text-color-secondary);
}

.question-container {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--bg-color-secondary);
  transition: transform var(--transition-fast);
}

.question-container:hover {
  transform: translateX(3px);
}

.question {
  font-weight: 500;
  margin-bottom: var(--spacing-md);
  color: var(--text-color);
}

.options {
  margin-left: var(--spacing-lg);
}

.option {
  margin-bottom: var(--spacing-sm);
}

.option label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
}

.option label:hover {
  background-color: var(--bg-color-tertiary);
}

.option label.selected {
  background-color: rgba(10, 132, 255, 0.1);
}

.option input[type="radio"] {
  display: none;
}

.option-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--border-radius-full);
  border: 1px solid var(--border-color);
  margin-right: var(--spacing-md);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.selected .option-label {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(10, 132, 255, 0.3);
}

.option-text {
  color: var(--text-color);
}

.actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-weight: 500;
  transition: all var(--transition-fast);
  min-width: 100px;
}

.reset-btn {
  background-color: var(--bg-color-tertiary);
  color: var(--text-color);
}

.reset-btn:hover {
  background-color: var(--bg-color-secondary);
  transform: translateY(-2px);
}

.submit-btn {
  background-color: var(--primary-color);
  color: white;
}

.submit-btn:hover {
  background-color: var(--primary-color-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(10, 132, 255, 0.3);
}

.copyright {
  text-align: center;
  margin-top: var(--spacing-xl);
  font-size: 0.8rem;
  color: var(--text-color-tertiary);
}

.copyright a {
  color: var(--text-color-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.copyright a:hover {
  color: var(--primary-color);
}

/* Responsive styles */
@media (max-width: 768px) {
  .student-info {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .name-field input {
    width: 100%;
  }

  .actions {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  button {
    width: 100%;
  }
}

/* Add animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.question-container {
  animation: fadeIn 0.5s ease-out;
  animation-fill-mode: both;
}

/* Stagger the animations for each question */
.question-container:nth-child(1) { animation-delay: 0.1s; }
.question-container:nth-child(2) { animation-delay: 0.2s; }
.question-container:nth-child(3) { animation-delay: 0.3s; }
.question-container:nth-child(4) { animation-delay: 0.4s; }
.question-container:nth-child(5) { animation-delay: 0.5s; }
.question-container:nth-child(6) { animation-delay: 0.6s; }
.question-container:nth-child(7) { animation-delay: 0.7s; }
.question-container:nth-child(8) { animation-delay: 0.8s; }
.question-container:nth-child(9) { animation-delay: 0.9s; }
.question-container:nth-child(10) { animation-delay: 1.0s; }
.question-container:nth-child(11) { animation-delay: 1.1s; }
.question-container:nth-child(12) { animation-delay: 1.2s; }

/* Pulse animation for option selection */
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(10, 132, 255, 0.7);
  }

  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(10, 132, 255, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(10, 132, 255, 0);
  }
}

.pulse-animation {
  animation: pulse 0.6s cubic-bezier(0.4, 0, 0.6, 1);
}

/* Score animation */
@keyframes scoreReveal {
  0% {
    transform: scale(1);
    color: var(--primary-color);
  }
  50% {
    transform: scale(1.5);
    color: var(--success-color);
  }
  100% {
    transform: scale(1);
    color: var(--primary-color);
  }
}

.score-animation {
  animation: scoreReveal 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
