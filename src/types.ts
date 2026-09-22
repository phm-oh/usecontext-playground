export type StudentProfile = {
  name: string
  studentId: string
  startedAt: string
}

export type QuizAnswerMap = Record<string, number>

export type QuizResult = {
  score: number
  total: number
  percent: number
  answers: QuizAnswerMap
  completedAt: string
}

export type QuizKind = 'pretest' | 'posttest'

export type Question = {
  id: string
  prompt: string
  choices: string[]
  answer: number
  explain: string
}

export type LessonSection =
  | { type: 'text'; title?: string; body: string }
  | { type: 'list'; title: string; items: string[] }
  | { type: 'code'; title: string; caption?: string; code: string }
  | { type: 'callout'; tone: 'tip' | 'warn' | 'lab'; title: string; body: string }

export type Lesson = {
  id: string
  order: number
  minutes: number
  title: string
  subtitle: string
  goal: string
  sections: LessonSection[]
  recap: string[]
  check: Question[]
}

export type PlaygroundTask = {
  id: string
  title: string
  prompt: string
  choices: string[]
  answer: number
  explain: string
  points: number
}

export type AppState = {
  profile: StudentProfile | null
  pretest: QuizResult | null
  posttest: QuizResult | null
  completedLessons: string[]
  lessonChecks: Record<string, number>
  lessonAnswers: Record<string, QuizAnswerMap>
  playgroundDone: string[]
  playgroundAnswers: Record<string, number>
  playgroundScore: number
}
