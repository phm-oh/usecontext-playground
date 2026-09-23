import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CodeBlock } from '../components/CodeBlock'
import { QuizForm } from '../components/QuizForm'
import { ScoreModal } from '../components/ScoreModal'
import { useStudent } from '../context/StudentContext'
import { getLesson, lessons } from '../data/lessons'

export function LessonDetail() {
  const { id } = useParams()
  const lesson = id ? getLesson(id) : undefined
  const { state, completeLesson, saveLessonCheck } = useStudent()
  const [checkScore, setCheckScore] = useState<number | null>(null)

  if (!lesson) return <Navigate to="/lessons" replace />

  const index = lessons.findIndex((item) => item.id === lesson.id)
  const prev = lessons[index - 1]
  const next = lessons[index + 1]
  const savedAnswers = state.lessonAnswers[lesson.id]
  const done = state.completedLessons.includes(lesson.id)

  return (
    <article>
      <div className="kicker">บทที่ {lesson.order} · {lesson.minutes} นาที</div>
      <h1>{lesson.title}</h1>
      <p className="lead">{lesson.goal}</p>

      <div className="lesson-list mt">
        {lesson.sections.map((section, i) => {
          if (section.type === 'text') {
            return (
              <section className="card" key={i}>
                {section.title ? <h3>{section.title}</h3> : null}
                <p>{section.body}</p>
              </section>
            )
          }
          if (section.type === 'list') {
            return (
              <section className="card" key={i}>
                <h3>{section.title}</h3>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )
          }
          if (section.type === 'code') {
            return (
              <section className="card" key={i}>
                <h3>{section.title}</h3>
                <CodeBlock code={section.code} caption={section.caption} />
              </section>
            )
          }
          return (
            <aside className={`callout ${section.tone}`} key={i}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </aside>
          )
        })}

        <section className="card">
          <h3>สรุปท้ายบท</h3>
          <ul>
            {lesson.recap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h3>แบบฝึกหัดท้ายบท</h3>
          <p>เลือกคำตอบทั้ง 2 ข้อ แล้วกดตรวจคำตอบ ข้อนี้เป็นคำถามสั้น ๆ ไม่ใช่การเขียนโค้ด</p>
          <QuizForm
            questions={lesson.check}
            lockedAnswers={savedAnswers}
            submitLabel="ตรวจคำตอบ"
            onSubmit={(answers) => {
              const score = lesson.check.filter((q) => answers[q.id] === q.answer).length
              saveLessonCheck(lesson.id, score, answers)
              completeLesson(lesson.id)
              setCheckScore(score)
            }}
          />
        </section>
      </div>

      <div className="stack mt">
        <button className="ghost" type="button" onClick={() => completeLesson(lesson.id)}>
          {done ? 'บันทึกว่าเรียนแล้ว' : 'ทำเครื่องหมายว่าเรียนจบ'}
        </button>
        {prev ? (
          <Link className="ghost" to={`/lessons/${prev.id}`}>
            บทก่อนหน้า
          </Link>
        ) : null}
        {next ? (
          <Link className="btn" to={`/lessons/${next.id}`}>
            บทถัดไป
          </Link>
        ) : (
          <Link className="btn" to="/playground">
            ไปแบบฝึกปฏิบัติ
          </Link>
        )}
      </div>

      {checkScore !== null ? (
        <ScoreModal
          title={`คะแนนท้ายบทที่ ${lesson.order}`}
          score={checkScore}
          total={lesson.check.length}
          percent={Math.round((checkScore / lesson.check.length) * 100)}
          note="บันทึกคะแนนแบบฝึกหัดท้ายบทแล้ว"
          primaryTo={next ? `/lessons/${next.id}` : '/playground'}
          primaryLabel={next ? 'ไปบทถัดไป' : 'ไปแบบฝึกปฏิบัติ'}
          onClose={() => setCheckScore(null)}
        />
      ) : null}
    </article>
  )
}
