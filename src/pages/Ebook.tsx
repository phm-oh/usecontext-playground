import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { ebookChapters, ebookMeta, ebookQuiz, type EbookSection } from '../data/ebook'

const letters = ['ก', 'ข', 'ค', 'ง']

function SectionView({ section }: { section: EbookSection }) {
  if (section.type === 'text') {
    return (
      <div className="mt">
        {section.title ? <h3>{section.title}</h3> : null}
        <p>{section.body}</p>
      </div>
    )
  }
  if (section.type === 'list') {
    return (
      <div className="mt">
        <h3>{section.title}</h3>
        <ul>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }
  if (section.type === 'code') {
    return (
      <div className="mt">
        {section.title ? <h3>{section.title}</h3> : null}
        <CodeBlock code={section.code} caption={section.caption} />
      </div>
    )
  }
  if (section.type === 'table') {
    return (
      <div className="mt">
        {section.title ? <h3>{section.title}</h3> : null}
        <div className="table-wrap">
          <table className="score-table">
            <thead>
              <tr>
                <th>{section.head[0]}</th>
                <th>{section.head[1]}</th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  return (
    <aside className={`callout ${section.tone} mt`}>
      <h3>{section.title}</h3>
      <p>{section.body}</p>
    </aside>
  )
}

export function Ebook() {
  const [showAnswers, setShowAnswers] = useState(false)

  return (
    <section>
      <div className="kicker">เอกสารประกอบการอ่านเพิ่มเติม</div>
      <h1>{ebookMeta.subtitle}</h1>
      <p className="lead">{ebookMeta.intro}</p>

      <div className="card mt">
        <div className="tiny">{ebookMeta.course}</div>
        <h3>{ebookMeta.title}</h3>
        <p>จัดทำโดย {ebookMeta.author}</p>
        <div className="stack mt">
          <a className="btn" href={ebookMeta.driveUrl} target="_blank" rel="noreferrer">
            เปิด E-book (PDF)
          </a>
        </div>
        <p className="tiny mt">
          ลิงก์ไฟล์:{' '}
          <a href={ebookMeta.driveUrl} target="_blank" rel="noreferrer">
            {ebookMeta.driveUrl}
          </a>
        </p>
      </div>

      <div className="card mt">
        <h3>สารบัญ</h3>
        <div className="step-list">
          {ebookChapters.map((chapter) => (
            <a className="step-item" key={chapter.id} href={`#${chapter.id}`}>
              <span className="step-num">{chapter.order}</span>
              <span>{chapter.title}</span>
            </a>
          ))}
        </div>
      </div>

      {ebookChapters.map((chapter) => (
        <article className="card mt" id={chapter.id} key={chapter.id}>
          <div className="tiny">บทที่ {chapter.order}</div>
          <h2>{chapter.title}</h2>
          {chapter.sections.map((section, i) => (
            <SectionView section={section} key={i} />
          ))}
        </article>
      ))}

      <article className="card mt">
        <div className="tiny">ทบทวนตัวเอง</div>
        <h2>แบบทดสอบความเข้าใจ</h2>
        <p>ลองตอบในใจก่อน แล้วค่อยกดดูเฉลย ข้อสอบชุดนี้ไม่ถูกบันทึกคะแนน ใช้ทบทวนก่อนไปเรียน useContext เท่านั้น</p>
        <div className="lesson-list mt">
          {ebookQuiz.map((q, index) => (
            <article className="question" key={q.id}>
              <div className="tiny">ข้อ {index + 1}</div>
              <h3>{q.prompt}</h3>
              {q.choices.map((choice, i) => (
                <div key={choice} className={`choice${showAnswers && i === q.answer ? ' correct' : ''}`}>
                  {letters[i]}. {choice}
                </div>
              ))}
            </article>
          ))}
        </div>
        <button className="btn mt" type="button" onClick={() => setShowAnswers((v) => !v)}>
          {showAnswers ? 'ซ่อนเฉลย' : 'ดูเฉลย'}
        </button>
      </article>
    </section>
  )
}
