export const QUIZ_QUESTION_COUNT = 10
export const POINTS_PER_QUESTION = 2
export const FULL_SCORE = QUIZ_QUESTION_COUNT * POINTS_PER_QUESTION
export const PASS_SCORE = 14
export const PASS_PERCENT = Math.round((PASS_SCORE / FULL_SCORE) * 100)

export function quizScore(correctCount: number) {
  const score = correctCount * POINTS_PER_QUESTION
  return {
    score,
    total: FULL_SCORE,
    percent: Math.round((score / FULL_SCORE) * 100),
  }
}

export function mean(values: number[]) {
  return values.reduce((sum, n) => sum + n, 0) / values.length
}

export function formatScore(value: number, digits = 2) {
  return value.toFixed(digits)
}
