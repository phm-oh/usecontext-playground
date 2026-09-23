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

  return (
    <section>
      <div className="kicker">แบบทดสอบก่อนเรียน</div>
      <h1>ตอบตามที่รู้ตอนนี้ ยังไม่ต้องเปิดบทเรียน</h1>
      <p className="lead">
        10 ข้อ ข้อละ 2 คะแนน เต็ม 20 คะแนน เลือกให้ครบทุกข้อแล้วกดส่ง เห็นคะแนนได้ทันที
      </p>
      {state.pretest ? (
        <div className="card mt">
          <h3>ส่งไปแล้ว ได้ {state.pretest.score}/{state.pretest.total} คะแนน</h3>
          <p>เลื่อนลงไปดูเฉลยแต่ละข้อได้ หรือไปเริ่มบทเรียนต่อเลย</p>
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
