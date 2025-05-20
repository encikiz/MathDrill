import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Worksheet from '../Worksheet.vue'
import worksheetData from '../../data/worksheetData'

// Mock the DOM methods that aren't available in the test environment
window.HTMLElement.prototype.classList = {
  add: vi.fn(),
  remove: vi.fn()
} as any;

describe('Worksheet', () => {
  it('renders properly', () => {
    const wrapper = mount(Worksheet)
    expect(wrapper.text()).toContain(worksheetData.title)
    expect(wrapper.text()).toContain('Name:')
    expect(wrapper.text()).toContain('Score:')
  })

  it('displays all questions', () => {
    const wrapper = mount(Worksheet)
    worksheetData.questions.forEach(question => {
      expect(wrapper.text()).toContain(question.question)
      question.options.forEach(option => {
        expect(wrapper.text()).toContain(option)
      })
    })
  })

  it('shows copyright information', () => {
    const wrapper = mount(Worksheet)
    expect(wrapper.text()).toContain(worksheetData.copyright)
  })

  it('requires name before calculating score', async () => {
    const wrapper = mount(Worksheet)

    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    // Try to calculate score without entering a name
    await wrapper.find('.submit-btn').trigger('click')

    expect(alertMock).toHaveBeenCalledWith('Please enter your name before submitting.')

    // Restore the original implementation
    alertMock.mockRestore()
  })

  it('calculates score correctly', async () => {
    const wrapper = mount(Worksheet)

    // Enter a name
    await wrapper.find('#student-name').setValue('Test Student')

    // Select all correct answers
    for (let i = 0; i < worksheetData.questions.length; i++) {
      const correctAnswer = worksheetData.questions[i].correctAnswer
      const radioButtons = wrapper.findAll(`input[name="question-${i}"]`)
      await radioButtons[correctAnswer].setValue(true)
    }

    // Calculate score
    await wrapper.find('.submit-btn').trigger('click')

    // Check if score is 12/12
    expect(wrapper.find('.score').text()).toBe('12/12')
  })

  it('resets the worksheet', async () => {
    const wrapper = mount(Worksheet)

    // Enter a name
    await wrapper.find('#student-name').setValue('Test Student')

    // Select some answers
    const radioButton = wrapper.find('input[name="question-0"]')
    await radioButton.setValue(true)

    // Calculate score
    await wrapper.find('.submit-btn').trigger('click')

    // Reset the worksheet
    await wrapper.find('.reset-btn').trigger('click')

    // Check if name is cleared
    expect(wrapper.find('#student-name').element.value).toBe('')

    // Check if score is reset
    expect(wrapper.find('.score').text()).toBe('___/12')
  })
})
