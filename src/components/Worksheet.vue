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
          @keyup.enter="calculateScore"
        />
      </div>
      <div class="score-field">
        <label>Score:</label>
        <span class="score" :class="{ 'has-score': score !== null }">
          {{ score !== null ? score : '___' }}/12
        </span>
      </div>
    </div>

    <div class="progress-bar" v-if="score !== null">
      <div class="progress-fill" :style="{ width: `${(score / 12) * 100}%` }"></div>
    </div>

    <p class="instructions">Circle the correct answers.</p>

    <div class="questions">
      <div
        v-for="(question, qIndex) in worksheetData.questions"
        :key="qIndex"
        class="question-container"
        :class="{ 'answered': selectedAnswers[qIndex] !== null }"
      >
        <div class="question-number">{{ qIndex + 1 }}</div>
        <div class="question-content">
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
    </div>

    <div class="actions">
      <button @click="resetWorksheet" class="btn btn-secondary reset-btn">
        <span class="btn-icon">↺</span> Reset
      </button>
      <button @click="calculateScore" class="btn btn-primary submit-btn">
        <span class="btn-icon">✓</span> Submit
      </button>
    </div>

    <div class="result-message" v-if="score !== null">
      <div class="result-content" :class="getScoreClass()">
        <div class="result-icon">{{ getScoreIcon() }}</div>
        <div class="result-text">
          <h3>{{ getScoreMessage() }}</h3>
          <p>You got {{ score }} out of 12 questions correct.</p>
        </div>
      </div>
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

// Functions for the result message
const getScoreClass = () => {
  if (score.value === null) return '';
  if (score.value >= 10) return 'excellent';
  if (score.value >= 7) return 'good';
  if (score.value >= 4) return 'average';
  return 'needs-improvement';
};

const getScoreIcon = () => {
  if (score.value === null) return '';
  if (score.value >= 10) return '🏆';
  if (score.value >= 7) return '👍';
  if (score.value >= 4) return '🔍';
  return '📚';
};

const getScoreMessage = () => {
  if (score.value === null) return '';
  if (score.value >= 10) return 'Excellent work!';
  if (score.value >= 7) return 'Good job!';
  if (score.value >= 4) return 'Keep practicing!';
  return 'Let\'s study more!';
};
</script>

<style scoped>
.worksheet {
  width: 100%;
  padding: var(--spacing-md);
}

.worksheet-title {
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

.worksheet-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
}

.student-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
  align-items: center;
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
  transition: all var(--transition-fast);
  border-color: var(--border-color);
}

.name-field input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.2);
}

.score {
  font-weight: 600;
  min-width: 50px;
  display: inline-block;
  color: var(--primary-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background-color: rgba(10, 132, 255, 0.1);
  transition: all var(--transition-normal);
}

.has-score {
  background-color: rgba(10, 132, 255, 0.2);
  box-shadow: 0 2px 8px rgba(10, 132, 255, 0.2);
}

.progress-bar {
  height: 6px;
  background-color: var(--bg-color-tertiary);
  border-radius: var(--border-radius-full);
  margin-bottom: var(--spacing-md);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #64aaff);
  border-radius: var(--border-radius-full);
  transition: width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.instructions {
  margin-bottom: var(--spacing-md);
  font-style: italic;
  color: var(--text-color-secondary);
  text-align: center;
  font-size: 0.9rem;
}

.questions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.question-container {
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--bg-color-secondary);
  transition: all var(--transition-fast);
  display: flex;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
}

.question-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  border-color: var(--border-color);
}

.question-container.answered {
  border-left: 3px solid var(--primary-color);
}

.question-number {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 0 0 var(--border-radius-sm) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
}

.question-content {
  flex: 1;
  padding-top: var(--spacing-md);
}

.question {
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
  color: var(--text-color);
  padding-left: var(--spacing-md);
}

.options {
  margin-left: var(--spacing-md);
}

.option {
  margin-bottom: var(--spacing-xs);
}

.option label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
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
  margin-right: var(--spacing-sm);
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
  font-size: 0.95rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-weight: 500;
  transition: all var(--transition-fast);
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon {
  margin-right: var(--spacing-xs);
  font-size: 1.1rem;
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

.result-message {
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--bg-color-secondary);
  animation: fadeIn 0.5s ease-out;
}

.result-content {
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  background-color: var(--bg-color-tertiary);
}

.result-icon {
  font-size: 2.5rem;
  margin-right: var(--spacing-md);
}

.result-text h3 {
  margin: 0 0 var(--spacing-xs) 0;
  font-weight: 600;
}

.result-text p {
  margin: 0;
  color: var(--text-color-secondary);
}

.excellent {
  background-color: rgba(48, 209, 88, 0.1);
  border-left: 4px solid var(--success-color);
}

.good {
  background-color: rgba(10, 132, 255, 0.1);
  border-left: 4px solid var(--primary-color);
}

.average {
  background-color: rgba(255, 214, 10, 0.1);
  border-left: 4px solid var(--warning-color);
}

.needs-improvement {
  background-color: rgba(255, 69, 58, 0.1);
  border-left: 4px solid var(--danger-color);
}

.copyright {
  text-align: center;
  margin-top: var(--spacing-lg);
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
    gap: var(--spacing-sm);
    align-items: flex-start;
  }

  .name-field input {
    width: 100%;
  }

  .actions {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  button {
    width: 100%;
  }

  .questions {
    grid-template-columns: 1fr;
  }
}

/* Desktop styles - more compact layout */
@media (min-width: 1024px) {
  .worksheet {
    padding: var(--spacing-sm);
  }

  .questions {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .question-container {
    margin-bottom: var(--spacing-sm);
    padding: var(--spacing-sm);
  }

  .option label {
    padding: var(--spacing-xs) var(--spacing-xs);
  }

  .actions {
    margin-top: var(--spacing-md);
    margin-bottom: var(--spacing-md);
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
.question-container:nth-child(1) { animation-delay: 0.05s; }
.question-container:nth-child(2) { animation-delay: 0.1s; }
.question-container:nth-child(3) { animation-delay: 0.15s; }
.question-container:nth-child(4) { animation-delay: 0.2s; }
.question-container:nth-child(5) { animation-delay: 0.25s; }
.question-container:nth-child(6) { animation-delay: 0.3s; }
.question-container:nth-child(7) { animation-delay: 0.35s; }
.question-container:nth-child(8) { animation-delay: 0.4s; }
.question-container:nth-child(9) { animation-delay: 0.45s; }
.question-container:nth-child(10) { animation-delay: 0.5s; }
.question-container:nth-child(11) { animation-delay: 0.55s; }
.question-container:nth-child(12) { animation-delay: 0.6s; }

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
