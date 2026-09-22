import { useState } from 'react'
import type { Question } from '../types'

type Props = {
  questions: Question[]
  lockedAnswers?: Record<string, number>
  onSubmit: (answers: Record<string, number>) => void
  submitLabel: string
}

export function QuizForm({ questions, lockedAnswers, onSubmit, submitLabel }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>(lockedAnswers ?? {})
  const reviewed = Boolean(lockedAnswers)

  return (
    <form
      className="lesson-list"
      onSubmit={(e) => {
        e.preventDefault()
        if (reviewed) return
        if (questions.some((q) => answers[q.id] === undefined)) return
        onSubmit(answers)
      }}
    >
      {questions.map((q, index) => {
        const picked = answers[q.id]
        return (
          <article className="question" key={q.id}>
            <div className="tiny">ข้อ {index + 1}</div>
            <h3>{q.prompt}</h3>
            {q.choices.map((choice, i) => {
              const selected = picked === i
              const className = [
                'choice',
                selected ? 'selected' : '',
                reviewed && i === q.answer ? 'correct' : '',
                reviewed && selected && i !== q.answer ? 'wrong' : '',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <button
                  key={choice}
                  type="button"
                  className={className}
                  disabled={reviewed}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                >
                  {choice}
                </button>
              )
            })}
            {reviewed ? <p className="mt">{q.explain}</p> : null}
          </article>
        )
      })}
      {!reviewed ? (
        <button
          className="btn"
          type="submit"
          disabled={questions.some((q) => answers[q.id] === undefined)}
        >
          {submitLabel}
        </button>
      ) : null}
    </form>
  )
}
