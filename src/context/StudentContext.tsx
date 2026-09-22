import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { lessons } from '../data/lessons'
import { playgroundTasks } from '../data/quizzes'
import { quizScore } from '../lib/scoring'
import { emptyState, loadState, saveState } from '../lib/storage'
import type { AppState, QuizAnswerMap, QuizKind, QuizResult, StudentProfile } from '../types'

type StudentContextValue = {
  state: AppState
  register: (profile: Omit<StudentProfile, 'startedAt'>) => void
  resetAll: () => void
  saveQuiz: (kind: QuizKind, questions: { id: string; answer: number }[], answers: QuizAnswerMap) => QuizResult
  completeLesson: (id: string) => void
  saveLessonCheck: (lessonId: string, score: number, answers: QuizAnswerMap) => void
  savePlaygroundTask: (taskId: string, selected: number, correct: boolean, points: number) => void
  lessonScore: number
  lessonScoreTotal: number
  playgroundTotal: number
  progressPercent: number
  canTakePosttest: boolean
}

const StudentContext = createContext<StudentContextValue | null>(null)

export function StudentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const value = useMemo<StudentContextValue>(() => {
    const lessonScore = Object.values(state.lessonChecks).reduce((sum, n) => sum + n, 0)
    const lessonScoreTotal = lessons.reduce((sum, lesson) => sum + lesson.check.length, 0)
    const playgroundTotal = playgroundTasks.reduce((sum, task) => sum + task.points, 0)
    const lessonProgress = state.completedLessons.length / lessons.length
    const quizProgress = (state.pretest ? 0.15 : 0) + (state.posttest ? 0.15 : 0)
    const playProgress = (state.playgroundDone.length / playgroundTasks.length) * 0.2
    const progressPercent = Math.round((lessonProgress * 0.5 + quizProgress + playProgress) * 100)

    return {
      state,
      register: (profile) => {
        setState({
          ...emptyState,
          profile: { ...profile, startedAt: new Date().toISOString() },
        })
      },
      resetAll: () => setState(emptyState),
      saveQuiz: (kind, questions, answers) => {
        const correct = questions.reduce((sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0), 0)
        const scored = quizScore(correct)
        const result: QuizResult = {
          ...scored,
          answers,
          completedAt: new Date().toISOString(),
        }
        setState((prev) => ({ ...prev, [kind]: result }))
        return result
      },
      completeLesson: (id) => {
        setState((prev) => ({
          ...prev,
          completedLessons: prev.completedLessons.includes(id)
            ? prev.completedLessons
            : [...prev.completedLessons, id],
        }))
      },
      saveLessonCheck: (lessonId, score, answers) => {
        setState((prev) => ({
          ...prev,
          lessonChecks: { ...prev.lessonChecks, [lessonId]: score },
          lessonAnswers: { ...prev.lessonAnswers, [lessonId]: answers },
        }))
      },
      savePlaygroundTask: (taskId, selected, correct, points) => {
        setState((prev) => {
          if (prev.playgroundDone.includes(taskId)) return prev
          return {
            ...prev,
            playgroundDone: [...prev.playgroundDone, taskId],
            playgroundAnswers: { ...prev.playgroundAnswers, [taskId]: selected },
            playgroundScore: prev.playgroundScore + (correct ? points : 0),
          }
        })
      },
      lessonScore,
      lessonScoreTotal,
      playgroundTotal,
      progressPercent,
      canTakePosttest: Boolean(state.pretest) && state.completedLessons.length >= 4,
    }
  }, [state])

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
}

export function useStudent() {
  const ctx = useContext(StudentContext)
  if (!ctx) throw new Error('useStudent ต้องอยู่ภายใน StudentProvider')
  return ctx
}
