import { classroomStatText, classroomStats, classroomStudents, fullName } from '../data/classroom'
import { FULL_SCORE, PASS_SCORE } from '../lib/scoring'

export function Classroom() {
  const text = classroomStatText()
  const preWidth = (classroomStats.pre.mean / FULL_SCORE) * 100
  const postWidth = (classroomStats.post.mean / FULL_SCORE) * 100

  return (
    <section>
      <div className="print-actions">
        <button className="ghost" type="button" onClick={() => window.print()}>
          พิมพ์ใบรายงานชั้นเรียน
        </button>
      </div>
      <div className="kicker">ผลการใช้ระบบ · กลุ่มทดลอง 20 คน</div>
      <h1>ผลคะแนนนักเรียนทั้งชั้น</h1>
      <p className="lead">
        นักเรียน ปวส. สาขาเทคโนโลยีสารสนเทศ ที่เรียนชุดสื่อ useContext
        แบบทดสอบเต็ม {FULL_SCORE} คะแนน เกณฑ์ผ่าน {PASS_SCORE} คะแนน ({Math.round((PASS_SCORE / FULL_SCORE) * 100)}%)
      </p>

      <div className="stats">
        <div className="card">
          <div className="tiny">จำนวนนักเรียน</div>
          <div className="num">{classroomStats.count}</div>
          <p>ลงทะเบียนและใช้ระบบครบวงจร</p>
        </div>
        <div className="card">
          <div className="tiny">คะแนนเฉลี่ยก่อนเรียน</div>
          <div className="num">{text.preMean}</div>
          <p>
            สูงสุด {classroomStats.pre.max} · ต่ำสุด {classroomStats.pre.min}
          </p>
        </div>
        <div className="card">
          <div className="tiny">คะแนนเฉลี่ยหลังเรียน</div>
          <div className="num">{text.postMean}</div>
          <p>
            สูงสุด {classroomStats.post.max} · ต่ำสุด {classroomStats.post.min}
          </p>
        </div>
        <div className="card">
          <div className="tiny">ผ่านเกณฑ์หลังเรียน</div>
          <div className="num">{text.passRate}%</div>
          <p>
            {classroomStats.passed}/{classroomStats.count} คน · พัฒนาเฉลี่ย +{text.gain}
          </p>
        </div>
      </div>

      <div className="grid-2">
        <article className="card">
          <h3>เปรียบเทียบค่าเฉลี่ยทั้งชั้น</h3>
          <p>ก่อนเรียน {text.preMean} / {FULL_SCORE}</p>
          <div className="bar pre">
            <span style={{ width: `${preWidth}%` }} />
          </div>
          <p className="mt">หลังเรียน {text.postMean} / {FULL_SCORE}</p>
          <div className="bar post">
            <span style={{ width: `${postWidth}%` }} />
          </div>
          <p className="mt">เส้นเกณฑ์ผ่าน {PASS_SCORE} คะแนน</p>
          <div className="bar">
            <span style={{ width: `${(PASS_SCORE / FULL_SCORE) * 100}%`, background: 'var(--gold)' }} />
          </div>
        </article>
        <article className="card">
          <h3>สรุปสำหรับใบประเมิน PA</h3>
          <ul className="report-list">
            <li>กลุ่มตัวอย่าง {classroomStats.count} คน</li>
            <li>
              ก่อนเรียน เฉลี่ย {text.preMean} คะแนน สูงสุด {classroomStats.pre.max} ต่ำสุด {classroomStats.pre.min}
            </li>
            <li>
              หลังเรียน เฉลี่ย {text.postMean} คะแนน สูงสุด {classroomStats.post.max} ต่ำสุด {classroomStats.post.min}
            </li>
            <li>
              ผ่านเกณฑ์ {classroomStats.passed} คน คิดเป็น {text.passRate}% ซึ่งสูงกว่าเกณฑ์เดิม 82.36%
            </li>
            <li>คะแนนเฉลี่ยเพิ่มขึ้น {text.gain} คะแนน</li>
          </ul>
        </article>
      </div>

      <article className="card mt table-card">
        <h3>ตารางคะแนนและการใช้ระบบ</h3>
        <p>คะแนนเต็ม {FULL_SCORE} · ผ่านเมื่อได้ {PASS_SCORE} คะแนนขึ้นไปหลังเรียน</p>
        <div className="table-wrap">
          <table className="score-table">
            <thead>
              <tr>
                <th>ที่</th>
                <th>รหัส</th>
                <th>ชื่อ–สกุล</th>
                <th>ก่อนเรียน</th>
                <th>หลังเรียน</th>
                <th>พัฒนา</th>
                <th>บทเรียน</th>
                <th>แล็บ</th>
                <th>ผล</th>
              </tr>
            </thead>
            <tbody>
              {classroomStudents.map((student) => {
                const passed = student.post >= PASS_SCORE
                return (
                  <tr key={student.studentId}>
                    <td>{student.no}</td>
                    <td>{student.studentId}</td>
                    <td className="name-cell">{fullName(student)}</td>
                    <td>{student.pre}</td>
                    <td>{student.post}</td>
                    <td className="ok">+{student.post - student.pre}</td>
                    <td>{student.lessonsDone}/6</td>
                    <td>{student.playground}/20</td>
                    <td>
                      <span className={`badge ${passed ? 'badge-ok' : 'badge-bad'}`}>
                        {passed ? 'ผ่าน' : 'ไม่ผ่าน'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>ค่าเฉลี่ยทั้งชั้น</td>
                <td>{text.preMean}</td>
                <td>{text.postMean}</td>
                <td className="ok">+{text.gain}</td>
                <td colSpan={3}>
                  ผ่าน {classroomStats.passed}/{classroomStats.count} = {text.passRate}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </article>
    </section>
  )
}
