import { Link } from 'react-router-dom'
import { useStudent } from '../context/StudentContext'
import { lessons } from '../data/lessons'

export function Lessons() {
  const { state } = useStudent()

  return (
    <section>
      <div className="kicker">เนื้อหา 6 บท</div>
      <h1>อ่านเรียงตามลำดับ ไม่ต้องข้าม</h1>
      <p className="lead">
        แต่ละบทใช้เวลาไม่เกิน 10 นาที มีโค้ดตัวอย่างประกอบ และคำถามท้ายบท 2 ข้อให้เช็กความเข้าใจ
        ส่วนที่ได้ลงมือกดจริง ๆ อยู่ในเมนูแบบฝึกปฏิบัติ
      </p>
      <div className="lesson-list mt">
        {lessons.map((lesson) => {
          const done = state.completedLessons.includes(lesson.id)
          return (
            <Link key={lesson.id} className="card lesson-item" to={`/lessons/${lesson.id}`}>
              <div className="lesson-index">{String(lesson.order).padStart(2, '0')}</div>
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.subtitle}</p>
                <div className="tiny">ใช้สอนประมาณ {lesson.minutes} นาที · แบบฝึกหัดท้ายบท 2 ข้อ</div>
              </div>
              <div>{done ? <span className="ok">เรียนแล้ว</span> : <span className="muted">ยังไม่จบ</span>}</div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
