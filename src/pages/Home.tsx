import { Link } from 'react-router-dom'
import { classroomStatText, classroomStats } from '../data/classroom'
import { lessons } from '../data/lessons'
import { FULL_SCORE, PASS_SCORE } from '../lib/scoring'

const steps = [
  {
    title: 'ทำแบบทดสอบก่อนเรียน',
    body: 'ตอบ 10 ข้อสั้น ๆ เช็กดูว่าตอนนี้เข้าใจเรื่องการส่งข้อมูลในหน้าเว็บแค่ไหน ใช้เวลาไม่ถึง 10 นาที',
    to: '/pretest',
    label: 'เริ่มทำข้อสอบ',
  },
  {
    title: 'อ่านบทเรียนทั้ง 6 บท',
    body: 'ไล่จากปัญหาที่เจอบ่อย ไปจนถึงวิธีแก้ด้วย useContext แต่ละบทมีโค้ดตัวอย่างและคำถามท้ายบท',
    to: '/lessons',
    label: 'เข้าบทเรียน',
  },
  {
    title: 'ดูตัวอย่างโค้ดทีละบรรทัด',
    body: 'เปิดโค้ดจริง กดดูทีละจุดว่าบรรทัดไหนสร้างกล่อง บรรทัดไหนใส่ค่า บรรทัดไหนอ่านค่า',
    to: '/examples',
    label: 'ดูตัวอย่างโค้ด',
  },
  {
    title: 'ลงมือทำแบบฝึกปฏิบัติ',
    body: 'มีสามกิจกรรมให้กดเล่นจริง แล้วตอบคำถามจากแผนภาพที่เห็นตรงหน้า',
    to: '/playground',
    label: 'ไปฝึกปฏิบัติ',
  },
]

export function Home() {
  const classText = classroomStatText()

  return (
    <div>
      <section className="hero">
        <div>
          <div className="kicker">React · useContext</div>
          <h1>แชร์ข้อมูลให้ทุก Component ใช้ร่วมกัน ไม่ต้องส่ง Props ทีละชั้น</h1>
          <p className="lead">
            useContext เป็น React Hook สำหรับดึงข้อมูลจาก Context มาใช้ใน Component ได้ทันที
            โดยไม่ต้องส่งผ่าน Props ลงไปทีละชั้นเหมือนที่ผ่านมา เหมาะกับข้อมูลที่หลายจุดต้องใช้ร่วมกัน
            เช่น Theme สีของเว็บ ข้อมูลผู้ใช้ที่ล็อกอิน หรือภาษาที่เลือกไว้
            ช่วยลดปัญหา Prop Drilling ที่ทำให้โค้ดยาวและอ่านยากไปได้มาก
          </p>
          <div className="stack mt">
            <Link className="btn gold" to="/lessons">
              เริ่มบทเรียน
            </Link>
            <Link className="ghost light" to="/examples">
              ดูตัวอย่างโค้ด
            </Link>
          </div>
        </div>
        <div className="panel">
          <h3>ลำดับที่แนะนำ</h3>
          <div className="step-list">
            <div className="step-item">
              <span className="step-num">1</span>
              <span>ทำแบบทดสอบก่อนเรียน</span>
            </div>
            <div className="step-item">
              <span className="step-num">2</span>
              <span>อ่านบทเรียนและตอบคำถามท้ายบท</span>
            </div>
            <div className="step-item">
              <span className="step-num">3</span>
              <span>ดูตัวอย่างโค้ด แล้วไปแบบฝึกปฏิบัติ</span>
            </div>
            <div className="step-item">
              <span className="step-num">4</span>
              <span>ปิดท้ายด้วยแบบทดสอบหลังเรียน</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="card">
          <div className="num">{lessons.length}</div>
          <h3>บทเรียน</h3>
          <p>จากปัญหาการส่งข้อมูลทีละชั้น ไปจนถึงว่าเมื่อไรควรใช้ เมื่อไรไม่ต้องใช้</p>
        </div>
        <div className="card">
          <div className="num">{FULL_SCORE}</div>
          <h3>คะแนนเต็มต่อชุดข้อสอบ</h3>
          <p>ก่อนเรียนกับหลังเรียนคนละชุด ผ่านเกณฑ์ที่ {PASS_SCORE} คะแนนขึ้นไป</p>
        </div>
        <div className="card">
          <div className="num">3</div>
          <h3>กิจกรรมในแบบฝึกปฏิบัติ</h3>
          <p>ส่งชื่อผู้ใช้ เปลี่ยนโทนสีทั้งแอป และตะกร้าสินค้าที่ใช้ร่วมกันสองจุด</p>
        </div>
        <div className="card">
          <div className="num">{classText.passRate}%</div>
          <h3>ผลจากกลุ่มที่ทดลองใช้จริง</h3>
          <p>
            ผ่านเกณฑ์ {classroomStats.passed} จาก {classroomStats.count} คน คะแนนเฉลี่ยหลังเรียนอยู่ที่ {classText.postMean}
          </p>
        </div>
      </section>

      <section className="path-grid">
        {steps.map((step, i) => (
          <article className="card path-card" key={step.title}>
            <span className="path-no">{i + 1}</span>
            <h2>{step.title}</h2>
            <p>{step.body}</p>
            <Link className="btn" to={step.to}>
              {step.label}
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
