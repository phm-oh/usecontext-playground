import { useState } from 'react'
import { Link } from 'react-router-dom'

type Sample = {
  id: string
  title: string
  summary: string
  code: string
  notes: { line: string; text: string }[]
}

const samples: Sample[] = [
  {
    id: 'create',
    title: '1. สร้างกล่อง',
    summary: 'createContext สร้างที่เก็บข้อมูลกลาง ค่าในวงเล็บเป็นค่าสำรองเมื่อยังไม่มีใครใส่ค่าจริง',
    code: `import { createContext } from 'react'

export const ThemeContext = createContext('light')`,
    notes: [
      { line: 'createContext', text: 'คำสั่งนี้สร้างกล่องชื่อ ThemeContext' },
      { line: "'light'", text: 'ถ้ายังไม่มี Provider ค่าที่อ่านได้จะเป็น light' },
    ],
  },
  {
    id: 'provide',
    title: '2. ใส่ค่าและกำหนดขอบเขต',
    summary: 'Provider ใส่ค่าจริง และครอบเฉพาะส่วนที่อนุญาตให้อ่านค่านั้น',
    code: `function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <button onClick={() => setTheme('dark')}>
        เปลี่ยนเป็นโทนมืด
      </button>
    </ThemeContext.Provider>
  )
}`,
    notes: [
      { line: 'useState', text: 'theme คือค่าที่เปลี่ยนได้เมื่อกดปุ่ม' },
      { line: 'Provider', text: 'ใส่ theme ลงกล่อง เฉพาะ Header กับปุ่มที่อยู่ข้างในอ่านได้' },
      { line: 'setTheme', text: 'พอค่าเปลี่ยน ทุกจุดที่เปิดกล่องนี้จะได้ค่าใหม่' },
    ],
  },
  {
    id: 'read',
    title: '3. อ่านค่าด้วย useContext',
    summary: 'จุดที่ต้องใช้ค่าไม่ต้องรอให้คนส่ง props มา เปิดกล่องเองได้',
    code: `function Header() {
  const theme = useContext(ThemeContext)

  return (
    <header className={theme}>
      ตอนนี้ใช้โทน {theme}
    </header>
  )
}`,
    notes: [
      { line: 'useContext', text: 'ส่งชื่อกล่องเข้าไป แล้วได้ค่าที่ Provider ใส่ไว้' },
      { line: 'className={theme}', text: 'เอาค่าไปใช้กับหน้าจอได้ทันที' },
    ],
  },
  {
    id: 'hook',
    title: '4. ห่อไว้เป็นฟังก์ชันเรียกซ้ำ',
    summary: 'เขียน useTheme ครั้งเดียว แล้วให้ทุกหน้าเรียกฟังก์ชันนี้แทนการเปิดกล่องเอง',
    code: `function useTheme() {
  const theme = useContext(ThemeContext)
  if (theme == null) {
    throw new Error('ลืมครอบ ThemeProvider')
  }
  return theme
}

function Header() {
  const theme = useTheme()
  return <p>{theme}</p>
}`,
    notes: [
      { line: 'useTheme', text: 'ชื่อฟังก์ชันบอกเรื่องที่อ่าน คือโทนสี' },
      { line: 'throw new Error', text: 'ถ้าเรียกนอก Provider จะรู้ทันทีว่าลืมครอบ' },
      { line: 'const theme = useTheme()', text: 'หน้าที่ใช้งานไม่ต้องรู้รายละเอียดของกล่อง' },
    ],
  },
]

function highlight(code: string, active: string) {
  return code.split('\n').map((line, index) => {
    const on = active && line.includes(active)
    return (
      <div key={index} className={on ? 'code-line on' : 'code-line'}>
        <span className="code-no">{index + 1}</span>
        <span>{line || ' '}</span>
      </div>
    )
  })
}

export function Examples() {
  const [current, setCurrent] = useState(samples[0].id)
  const [active, setActive] = useState(samples[0].notes[0].line)
  const sample = samples.find((item) => item.id === current) ?? samples[0]

  return (
    <section>
      <div className="kicker">ตัวอย่างโค้ด</div>
      <h1>useContext ทีละขั้น</h1>
      <p className="lead">
        กดเลือกขั้นทางซ้าย แล้วกดคำอธิบายทางขวา บรรทัดที่เกี่ยวข้องในโค้ดจะถูกเน้นให้เห็น
      </p>

      <div className="example-layout mt">
        <aside className="example-nav">
          {samples.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === sample.id ? 'example-tab active' : 'example-tab'}
              onClick={() => {
                setCurrent(item.id)
                setActive(item.notes[0].line)
              }}
            >
              {item.title}
            </button>
          ))}
        </aside>

        <div className="card example-code">
          <h2>{sample.title}</h2>
          <p>{sample.summary}</p>
          <div className="code annotated">{highlight(sample.code, active)}</div>
        </div>

        <div className="example-notes">
          {sample.notes.map((note) => (
            <button
              key={note.line}
              type="button"
              className={active === note.line ? 'note-card active' : 'note-card'}
              onClick={() => setActive(note.line)}
            >
              <span className="tiny">{note.line}</span>
              <strong>{note.text}</strong>
            </button>
          ))}
          <Link className="btn" to="/playground">
            ไปลองในแบบฝึกปฏิบัติ
          </Link>
        </div>
      </div>
    </section>
  )
}
