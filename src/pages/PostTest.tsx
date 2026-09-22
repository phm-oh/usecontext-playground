import { useState } from 'react'
import { Link } from 'react-router-dom'
import { QuizForm } from '../components/QuizForm'
import { ScoreModal } from '../components/ScoreModal'
import { useStudent } from '../context/StudentContext'
import { posttestQuestions } from '../data/quizzes'
import type { QuizResult } from '../types'

export function PostTest() {
  const { state, canTakePosttest, saveQuiz } = useStudent()
  const [result, setResult] = useState<QuizResult | null>(null)

  if (!state.profile) {
    return (
      <section className="card">
        <h2>ยังไม่ลงทะเบียน</h2>
        <Link className="btn" to="/">
          ไปหน้าแรก
        </Link>
      </section>
    )
  }

  if (!canTakePosttest && !state.posttest) {
    return (
      <section className="card">
        <h2>ยังไม่ปลดล็อกข้อสอบหลังเรียน</h2>
        <p>ต้องทำแบบทดสอบก่อนเรียน และเรียนจบอย่างน้อย 4 บทก่อน เพื่อให้การประเมินก่อน–หลังมีความหมาย</p>
        <div className="stack mt">
          {!state.pretest ? (
            <Link className="btn" to="/pretest">
              ไปสอบก่อนเรียน
            </Link>
          ) : (
            <Link className="btn" to="/lessons">
              เรียนบทเรียนต่อ
            </Link>
          )}
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="kicker">แบบทดสอบหลังเรียน</div>
      <h1>วัดว่าเชื่อมทฤษฎีกับการปฏิบัติได้แล้วหรือยัง</h1>
      <p className="lead">
        10 ข้อเชิงสถานการณ์ · ข้อละ 2 คะแนน รวม 20 คะแนน
        เมื่อส่งแล้วระบบจะแจ้งคะแนนและพาไปหน้าเปรียบเทียบผล
      </p>
      {state.posttest ? (
        <div className="card mt">
          <h3>ส่งแล้ว ได้ {state.posttest.score}/{state.posttest.total} คะแนน</h3>
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
