import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStudent } from '../context/StudentContext'
import { classroomStatText, classroomStats, classroomStudents, fullName } from '../data/classroom'
import { lessons } from '../data/lessons'
import { FULL_SCORE, PASS_SCORE } from '../lib/scoring'

export function Home() {
  const { state, register, progressPercent } = useStudent()
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')
  const classText = classroomStatText()

  return (
    <div>
      <section className="hero">
        <div>
          <div className="kicker">ประเด็นท้าทาย · การจัดการพัฒนาซอฟต์แวร์ Front-End</div>
          <h1>เรียน useContext ให้เชื่อมทฤษฎีกับการปฏิบัติ</h1>
          <p className="lead">
            ชุดสื่อการเรียนออนไลน์สำหรับนักเรียน ปวส. สาขาเทคโนโลยีสารสนเทศ
            มีเนื้อหาครบวงจร ลงมือทำใน Playground และประเมินผลก่อน–หลังเรียนในระบบเดียวกัน
          </p>
          <div className="stack mt">
            {state.profile ? (
              <>
                <Link className="btn" to={state.pretest ? '/lessons' : '/pretest'}>
                  {state.pretest ? 'เรียนต่อ' : 'เริ่มแบบทดสอบก่อนเรียน'}
                </Link>
                <Link className="ghost" to="/classroom">
                  ดูผลชั้นเรียน
                </Link>
              </>
            ) : (
              <a className="btn" href="#register">
                ลงทะเบียนแล้วเริ่มเรียน
              </a>
            )}
          </div>
        </div>
        <div className="panel">
          <h3>วงจรการเรียน 4 จังหวะ</h3>
          <p>ออกแบบให้ครูใช้ประเมินได้ทันที โดยยังเป็น frontend-only และจำค่าในเครื่องนักเรียน</p>
          <ol>
            <li>ลงทะเบียนชื่อและรหัสนักศึกษา</li>
            <li>ทำแบบทดสอบก่อนเรียน 10 ข้อ</li>
            <li>เรียน 6 บท + ทดลองใน Playground</li>
            <li>สอบหลังเรียน แล้วดูคะแนนเปรียบเทียบ</li>
          </ol>
        </div>
      </section>

      <section className="stats">
        <div className="card">
          <div className="num">{lessons.length}</div>
          <h3>บทเรียน</h3>
          <p>จาก Prop Drilling ถึงโครงสร้างโปรเจกต์จริง</p>
        </div>
        <div className="card">
          <div className="num">{FULL_SCORE}</div>
          <h3>คะแนนเต็มต่อชุด</h3>
          <p>10 ข้อ ข้อละ 2 คะแนน เกณฑ์ผ่าน {PASS_SCORE} คะแนน</p>
        </div>
        <div className="card">
          <div className="num">4</div>
          <h3>แล็บสด</h3>
          <p>ต้นไม้คอมโพเนนต์ ธีม สิทธิ์ผู้ใช้ และตะกร้า</p>
        </div>
        <div className="card">
          <div className="num">{progressPercent}%</div>
          <h3>ความคืบหน้า</h3>
          <p>{state.profile ? 'ความคืบหน้าของนักเรียนคนนี้' : 'ลงทะเบียนเพื่อเริ่มนับความคืบหน้า'}</p>
        </div>
      </section>

      <section className="grid-2">
        <article className="card" id="register">
          <h2>ลงทะเบียนนักเรียน</h2>
          <p>
            แอปนี้ใช้ <b>StudentContext</b> เก็บชื่อ รหัส และคะแนน แล้วกระจายไปทุกหน้า
            นี่คือตัวอย่าง useContext ของจริง ไม่ใช่แค่สไลด์
          </p>
          {state.profile ? (
            <p className="ok">ลงทะเบียนแล้วในชื่อ {state.profile.name}</p>
          ) : (
            <form
              className="form-grid mt"
              onSubmit={(e) => {
                e.preventDefault()
                if (!name.trim() || !studentId.trim()) return
                register({ name: name.trim(), studentId: studentId.trim() })
              }}
            >
              <div>
                <label htmlFor="name">ชื่อ–นามสกุล</label>
                <input
                  id="name"
                  list="class-names"
                  value={name}
                  onChange={(e) => {
                    const next = e.target.value
                    setName(next)
                    const found = classroomStudents.find((s) => fullName(s) === next)
                    if (found) setStudentId(found.studentId)
                  }}
                  required
                />
                <datalist id="class-names">
                  {classroomStudents.map((student) => (
                    <option key={student.studentId} value={fullName(student)} />
                  ))}
                </datalist>
              </div>
              <div>
                <label htmlFor="sid">รหัสนักศึกษา</label>
                <input id="sid" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
              </div>
              <button className="btn" type="submit">
                เข้าสู่ห้องเรียน
              </button>
            </form>
          )}
        </article>
        <article className="card">
          <h2>เกณฑ์ประเมินชั้นเรียน</h2>
          <p>ชุดข้อมูลจำลองจากรายชื่อจริง {classroomStats.count} คน สำหรับใบประเมิน PA</p>
          <ul className="report-list">
            <li>ก่อนเรียนเฉลี่ย {classText.preMean} จาก {FULL_SCORE} คะแนน</li>
            <li>หลังเรียนเฉลี่ย {classText.postMean} จาก {FULL_SCORE} คะแนน</li>
            <li>ผ่านเกณฑ์ {classText.passRate}% สูงกว่าเกณฑ์เดิม 82.36%</li>
            <li>คะแนนเต็มชุดละ {FULL_SCORE} · ผ่านที่ {PASS_SCORE} คะแนนขึ้นไป</li>
          </ul>
          <Link className="btn mt" to="/classroom">
            เปิดตารางผลชั้นเรียน
          </Link>
        </article>
      </section>
    </div>
  )
}
