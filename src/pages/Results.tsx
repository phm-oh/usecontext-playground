import { Link } from 'react-router-dom'
import { useStudent } from '../context/StudentContext'
import { lessons } from '../data/lessons'
import { FULL_SCORE, PASS_SCORE } from '../lib/scoring'
import { scoreLevel } from '../lib/storage'

export function Results() {
  const { state, resetAll, lessonScore, lessonScoreTotal, playgroundTotal } = useStudent()
  const pre = state.pretest
  const post = state.posttest
  const delta = pre && post ? post.percent - pre.percent : null
  const postLevel = post ? scoreLevel(post.percent) : null

  return (
    <section>
      <div className="print-actions">
        <button className="ghost" type="button" onClick={() => window.print()}>
          พิมพ์ / บันทึกเป็น PDF
        </button>
        <button className="ghost" type="button" onClick={resetAll}>
          ล้างข้อมูลเครื่องนี้
        </button>
        <Link className="btn" to="/classroom">
          ดูผลทั้งชั้น
        </Link>
      </div>
      <div className="kicker">คะแนนที่ทำบนเครื่องนี้</div>
      <h1>ก่อนเรียนกับหลังเรียน ต่างกันแค่ไหน</h1>
      <p className="lead">
        ตัวเลขด้านล่างมาจากข้อสอบที่เพิ่งทำในเบราว์เซอร์นี้เท่านั้น
        ถ้าต้องการดูภาพรวมทั้งห้อง ไปที่เมนูผลทั้งชั้นแทน
      </p>

      <div className="card mt">
        <h3>สถานะบนเครื่องนี้</h3>
        {state.profile ? (
          <p>
            {state.profile.name} · รหัส {state.profile.studentId} · เริ่มเรียน{' '}
            {new Date(state.profile.startedAt).toLocaleString('th-TH')}
          </p>
        ) : (
          <p>ยังไม่พบข้อมูลผู้ทำในเครื่องนี้ ทำแบบทดสอบก่อนแล้วกลับมาดูอีกครั้ง</p>
        )}
      </div>

      <div className="stats">
        <div className="card">
          <div className="tiny">ก่อนเรียน</div>
          <div className="num">{pre ? `${pre.score}` : '—'}</div>
          <p>{pre ? `${pre.score}/${pre.total} คะแนน` : 'ยังไม่ได้สอบ'}</p>
        </div>
        <div className="card">
          <div className="tiny">หลังเรียน</div>
          <div className="num">{post ? `${post.score}` : '—'}</div>
          <p>{post ? `${post.score}/${post.total} คะแนน · ${postLevel?.label}` : 'ยังไม่ได้สอบ'}</p>
        </div>
        <div className="card">
          <div className="tiny">ส่วนต่าง</div>
          <div className="num">{delta === null ? '—' : `${delta > 0 ? '+' : ''}${post && pre ? post.score - pre.score : delta}`}</div>
          <p>{delta === null ? 'รอผลครบทั้งสองชุด' : delta >= 0 ? 'พัฒนาขึ้นหลังเรียน' : 'ควรทบทวนบทเรียน'}</p>
        </div>
        <div className="card">
          <div className="tiny">คะแนนเสริม</div>
          <div className="num">{lessonScore + state.playgroundScore}</div>
          <p>
            ท้ายบท {lessonScore}/{lessonScoreTotal} · แล็บ {state.playgroundScore}/{playgroundTotal}
          </p>
        </div>
      </div>

      <div className="grid-2">
        <article className="card">
          <h3>กราฟเปรียบเทียบ</h3>
          <p>ก่อนเรียน {pre ? `${pre.score}/${FULL_SCORE}` : 'ยังไม่มีข้อมูล'}</p>
          <div className="bar pre">
            <span style={{ width: `${pre ? (pre.score / FULL_SCORE) * 100 : 0}%` }} />
          </div>
          <p className="mt">หลังเรียน {post ? `${post.score}/${FULL_SCORE}` : 'ยังไม่มีข้อมูล'}</p>
          <div className="bar post">
            <span style={{ width: `${post ? (post.score / FULL_SCORE) * 100 : 0}%` }} />
          </div>
          <p className="mt">เกณฑ์ผ่าน {PASS_SCORE}/{FULL_SCORE} คะแนน</p>
          <div className="bar">
            <span style={{ width: `${(PASS_SCORE / FULL_SCORE) * 100}%`, background: 'var(--gold)' }} />
          </div>
        </article>
        <article className="card">
          <h3>ความคืบหน้าบทเรียน</h3>
          <ul>
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                บทที่ {lesson.order} {lesson.title}{' '}
                {state.completedLessons.includes(lesson.id) ? (
                  <span className="ok">จบแล้ว</span>
                ) : (
                  <span className="muted">ยังไม่จบ</span>
                )}
                {state.lessonChecks[lesson.id] !== undefined
                  ? ` · ตรวจท้ายบท ${state.lessonChecks[lesson.id]}/${lesson.check.length}`
                  : ''}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="card mt">
        <h3>สรุปผล</h3>
        {!pre || !post ? (
          <p>ทำทั้งแบบทดสอบก่อนเรียนและหลังเรียน แล้วกลับมาดูส่วนต่างที่หน้านี้</p>
        ) : post.score >= PASS_SCORE ? (
          <p className="ok">ผ่านเกณฑ์หลังเรียน {PASS_SCORE} คะแนน</p>
        ) : (
          <p className="bad">ยังไม่ถึงเกณฑ์ {PASS_SCORE} คะแนน กลับไปอ่านบทที่ 4 ถึง 6 แล้วลองแบบฝึกปฏิบัติอีกครั้ง</p>
        )}
      </article>
    </section>
  )
}
