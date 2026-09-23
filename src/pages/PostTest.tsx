import { useState } from 'react'
import { Link } from 'react-router-dom'
import { QuizForm } from '../components/QuizForm'
import { ScoreModal } from '../components/ScoreModal'
import { useStudent } from '../context/StudentContext'
import { posttestQuestions } from '../data/quizzes'
import { PASS_SCORE } from '../lib/scoring'
import type { QuizResult } from '../types'

export function PostTest() {
  const { state, saveQuiz } = useStudent()
  const [result, setResult] = useState<QuizResult | null>(null)

  return (
    <section>
      <div className="kicker">แบบทดสอบหลังเรียน</div>
      <h1>เช็กว่าตอนนี้เข้าใจมากขึ้นแค่ไหน</h1>
      <p className="lead">
        คนละชุดกับก่อนเรียน 10 ข้อ ข้อละ 2 คะแนน เต็ม 20 คะแนน ผ่านเกณฑ์ที่ {PASS_SCORE} คะแนนขึ้นไป
      </p>
      {state.posttest ? (
        <div className="card mt">
          <h3>ส่งไปแล้ว ได้ {state.posttest.score}/{state.posttest.total} คะแนน</h3>
          <Link className="btn" to="/results">
            ดูผลเปรียบเทียบ
          </Link>
        </div>
      ) : null}
      <div className="mt">
        <QuizForm
          questions={posttestQuestions}
          lockedAnswers={state.posttest?.answers}
          submitLabel="ส่งคำตอบและดูคะแนน"
          onSubmit={(answers) => setResult(saveQuiz('posttest', posttestQuestions, answers))}
        />
      </div>
      {result ? (
        <ScoreModal
          title="คะแนนสอบหลังเรียน"
          score={result.score}
          total={result.total}
          percent={result.percent}
          note={
            state.pretest
              ? `เทียบกับก่อนเรียน ${state.pretest.score}/${state.pretest.total} คะแนน ส่วนต่าง ${result.score - state.pretest.score}`
              : 'ไปดูสรุปผลได้ที่หน้าคะแนน'
          }
          primaryTo="/results"
          primaryLabel="เปิดใบรายงานคะแนน"
          onClose={() => setResult(null)}
        />
      ) : null}
    </section>
  )
}
