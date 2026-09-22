import { useState } from 'react'
import { Link } from 'react-router-dom'
import { QuizForm } from '../components/QuizForm'
import { ScoreModal } from '../components/ScoreModal'
import { useStudent } from '../context/StudentContext'
import { pretestQuestions } from '../data/quizzes'
import type { QuizResult } from '../types'

export function PreTest() {
  const { state, saveQuiz } = useStudent()
  const [result, setResult] = useState<QuizResult | null>(null)

  if (!state.profile) {
    return (
      <section className="card">
        <h2>ยังไม่ลงทะเบียน</h2>
        <p>กรุณาลงชื่อที่หน้าแรกก่อนเริ่มแบบทดสอบก่อนเรียน</p>
        <Link className="btn" to="/">
          ไปหน้าแรก
        </Link>
      </section>
    )
  }

  return (
    <section>
      <div className="kicker">แบบทดสอบก่อนเรียน</div>
      <h1>วัดพื้นฐานก่อนเข้าห้องแล็บ</h1>
      <p className="lead">
        10 ข้อ · ข้อละ 2 คะแนน รวม 20 คะแนน ไม่จับเวลา
        ใช้ดูจุดตั้งต้นก่อนเรียนเนื้อหาและลงมือใน Playground
      </p>
      {state.pretest ? (
        <div className="card mt">
          <h3>ทำไปแล้ว ได้ {state.pretest.score}/{state.pretest.total} คะแนน</h3>
          <p>ดูเฉลยด้านล่างได้ หรือไปเรียนเนื้อหาต่อ</p>
          <Link className="btn" to="/lessons">
            ไปบทเรียน
          </Link>
        </div>
      ) : null}
      <div className="mt">
        <QuizForm
          questions={pretestQuestions}
          lockedAnswers={state.pretest?.answers}
          submitLabel="ส่งคำตอบและดูคะแนน"
          onSubmit={(answers) => setResult(saveQuiz('pretest', pretestQuestions, answers))}
        />
      </div>
      {result ? (
        <ScoreModal
          title="คะแนนสอบก่อนเรียน"
          score={result.score}
          total={result.total}
          percent={result.percent}
          note="คะแนนนี้คือจุดตั้งต้น หลังเรียนจะเทียบกับข้อสอบหลังเรียน"
          primaryTo="/lessons"
          primaryLabel="เริ่มเรียนบทที่ 1"
          onClose={() => setResult(null)}
        />
      ) : null}
    </section>
  )
}
