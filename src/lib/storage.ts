import type { AppState } from '../types'

export const STORAGE_KEY = 'context-lab-student-v1'

export const emptyState: AppState = {
  profile: null,
  pretest: null,
  posttest: null,
  completedLessons: [],
  lessonChecks: {},
  lessonAnswers: {},
  playgroundDone: [],
  playgroundAnswers: {},
  playgroundScore: 0,
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState
    return { ...emptyState, ...JSON.parse(raw) } as AppState
  } catch {
    return emptyState
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function scoreLevel(percent: number) {
  if (percent >= 80) return { label: 'ดีมาก', tone: 'high' as const }
  if (percent >= 70) return { label: 'ผ่านเกณฑ์', tone: 'pass' as const }
  if (percent >= 50) return { label: 'ควรทบทวน', tone: 'mid' as const }
  return { label: 'ต้องเรียนเพิ่ม', tone: 'low' as const }
}
