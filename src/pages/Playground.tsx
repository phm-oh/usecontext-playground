import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { ScoreModal } from '../components/ScoreModal'
import { useStudent } from '../context/StudentContext'
import { playgroundTasks } from '../data/quizzes'

/* ---------------------------------------------------------- */
/* กล่องข้อมูลของแต่ละกิจกรรม (แยกจาก StudentContext ของระบบ)   */
/* ---------------------------------------------------------- */

type ThemeName = 'light' | 'dark' | 'sunset'

const ThemeLabContext = createContext<{
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
} | null>(null)

function ThemeLabProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('light')
  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return <ThemeLabContext.Provider value={value}>{children}</ThemeLabContext.Provider>
}

function useThemeLab() {
  const ctx = useContext(ThemeLabContext)
  if (!ctx) throw new Error('useThemeLab ต้องอยู่ภายใน ThemeLabProvider')
  return ctx
}

type CartItem = { id: string; name: string; price: number; qty: number }

const CartLabContext = createContext<{
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>) => void
  total: number
} | null>(null)

function CartLabProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const value = useMemo(() => {
    const add = (item: Omit<CartItem, 'qty'>) => {
      setItems((prev) => {
        const found = prev.find((row) => row.id === item.id)
        if (found) return prev.map((row) => (row.id === item.id ? { ...row, qty: row.qty + 1 } : row))
        return [...prev, { ...item, qty: 1 }]
      })
    }
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
    return { items, add, total }
  }, [items])
  return <CartLabContext.Provider value={value}>{children}</CartLabContext.Provider>
}

function useCartLab() {
  const ctx = useContext(CartLabContext)
  if (!ctx) throw new Error('useCartLab ต้องอยู่ภายใน CartLabProvider')
  return ctx
}

/* ---------------------------------------------------------- */
/* แผนภาพการไหลของข้อมูล (SVG connector จริง)                  */
/* ---------------------------------------------------------- */

type FlowTone = 'source' | 'pass' | 'store' | 'consumer'

type FlowNodeData = {
  id: string
  title: string
  detail: string
  tone: FlowTone
}

function Connector({ active }: { active?: boolean }) {
  return (
    <svg className={`flow-connector${active ? ' active' : ''}`} viewBox="0 0 34 24" fill="none">
      <line x1="1" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="2.4" />
      <path d="M22 6 L30 12 L22 18" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function FlowChart({ nodes }: { nodes: FlowNodeData[] }) {
  return (
    <div className="flowchart">
      {nodes.map((node, i) => (
        <div className="flow-item" key={node.id}>
          <div className={`flow-card ${node.tone}`}>
            <span className="flow-title">{node.title}</span>
            <span className="flow-detail">{node.detail}</span>
          </div>
          {i < nodes.length - 1 ? <Connector active={node.tone === 'source'} /> : null}
        </div>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------- */
/* คำถามท้ายกิจกรรม                                            */
/* ---------------------------------------------------------- */

function TaskQuestion({ index }: { index: number }) {
  const task = playgroundTasks[index]
  const { state, savePlaygroundTask, playgroundTotal } = useStudent()
  const [flash, setFlash] = useState<{ score: number; total: number } | null>(null)
  const done = state.playgroundDone.includes(task.id)
  const picked = state.playgroundAnswers[task.id]

  return (
    <div className="question mt">
      <div className="tiny">คำถาม · {task.points} คะแนน</div>
      <h3>{task.prompt}</h3>
      {task.choices.map((choice, i) => {
        const selected = picked === i
        const className = [
          'choice',
          selected ? 'selected' : '',
          done && i === task.answer ? 'correct' : '',
          done && selected && i !== task.answer ? 'wrong' : '',
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <button
            key={choice}
            type="button"
            className={className}
            disabled={done}
            onClick={() => {
              const correct = i === task.answer
              savePlaygroundTask(task.id, i, correct, task.points)
              setFlash({ score: correct ? task.points : 0, total: task.points })
            }}
          >
            {choice}
          </button>
        )
      })}
      {done ? <p>{task.explain}</p> : null}
      {flash ? (
        <ScoreModal
          title="คะแนนข้อนี้"
          score={flash.score}
          total={flash.total}
          percent={Math.round((flash.score / flash.total) * 100)}
          note={`คะแนนแบบฝึกปฏิบัติรวมตอนนี้ ${state.playgroundScore}/${playgroundTotal}`}
          onClose={() => setFlash(null)}
        />
      ) : null}
    </div>
  )
}

/* ---------------------------------------------------------- */
/* กิจกรรมที่ 1 · ส่งชื่อผู้ใช้ผ่านหลายชั้น เทียบกับกล่องกลาง     */
/* ---------------------------------------------------------- */

const drillNodes: FlowNodeData[] = [
  { id: 'app', title: 'App', detail: 'เก็บชื่อ “เมย์” ไว้', tone: 'source' },
  { id: 'layout', title: 'Layout', detail: 'รับชื่อมา ส่งต่อ', tone: 'pass' },
  { id: 'sidebar', title: 'Sidebar', detail: 'รับชื่อมา ส่งต่อ', tone: 'pass' },
  { id: 'header', title: 'Header', detail: 'รับชื่อมา ส่งต่อ', tone: 'pass' },
  { id: 'badge', title: 'การ์ดโปรไฟล์', detail: 'แสดงชื่อ “เมย์”', tone: 'consumer' },
]

const contextNodes: FlowNodeData[] = [
  { id: 'app', title: 'App', detail: 'ใส่ชื่อ “เมย์” ลงกล่อง', tone: 'source' },
  { id: 'box', title: 'กล่องผู้ใช้', detail: 'เก็บชื่อ “เมย์” ไว้', tone: 'store' },
  { id: 'badge', title: 'การ์ดโปรไฟล์', detail: 'เปิดกล่องมาอ่านเอง', tone: 'consumer' },
]

function NameFlowActivity() {
  const [mode, setMode] = useState<'drill' | 'context'>('drill')
  const drill = mode === 'drill'
  const nodes = drill ? drillNodes : contextNodes

  return (
    <div>
      <div className="flow-toolbar">
        <div className="stack">
          <button className={drill ? 'btn' : 'ghost'} type="button" onClick={() => setMode('drill')}>
            ส่งต่อทีละชั้น
          </button>
          <button className={!drill ? 'btn' : 'ghost'} type="button" onClick={() => setMode('context')}>
            ใช้กล่องข้อมูลกลาง
          </button>
        </div>
        <span className="flow-count">ผ่าน {nodes.length} จุด</span>
      </div>
      <FlowChart nodes={nodes} />
      <p>
        {drill
          ? 'Layout กับ Sidebar และ Header ไม่ได้แสดงชื่อเลย แค่รับมาแล้วส่งต่อไปเรื่อย ๆ'
          : 'พอมีกล่องกลาง สามชั้นตรงกลางหายไปทั้งหมด การ์ดโปรไฟล์เปิดกล่องอ่านชื่อได้เอง'}
      </p>
    </div>
  )
}

/* ---------------------------------------------------------- */
/* กิจกรรมที่ 2 · เปลี่ยนโทนสีทั้งแอปด้วยปุ่มเดียว                */
/* ---------------------------------------------------------- */

const themeLabels: Record<ThemeName, string> = { light: 'สว่าง', dark: 'มืด', sunset: 'ส้ม' }

function ThemeButtons() {
  const { theme, setTheme } = useThemeLab()
  return (
    <div className="stack">
      {(['light', 'dark', 'sunset'] as ThemeName[]).map((item) => (
        <button key={item} className={theme === item ? 'btn' : 'ghost'} type="button" onClick={() => setTheme(item)}>
          โทน{themeLabels[item]}
        </button>
      ))}
    </div>
  )
}

function ThemeActivity() {
  const { theme } = useThemeLab()
  const nodes: FlowNodeData[] = [
    { id: 'button', title: 'ปุ่มเลือกโทน', detail: 'กดแล้วเขียนค่าใหม่', tone: 'source' },
    { id: 'box', title: 'กล่องโทนสี', detail: `ตอนนี้เก็บโทน${themeLabels[theme]}`, tone: 'store' },
    { id: 'preview', title: 'กรอบตัวอย่าง', detail: 'อ่านค่าแล้วเปลี่ยนสีทันที', tone: 'consumer' },
  ]

  return (
    <div>
      <ThemeButtons />
      <div className="flow-split mt">
        <FlowChart nodes={nodes} />
        <div className={`preview ${theme}`}>
          <div className="tiny">ผลบนหน้าจอ</div>
          <h3>โทน{themeLabels[theme]}</h3>
          <p>ไม่มีใครส่ง props สีมาให้กรอบนี้เลย</p>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------- */
/* กิจกรรมที่ 3 · ตะกร้าสินค้าใบเดียว สองจุดอ่านค่า               */
/* ---------------------------------------------------------- */

const products = [
  { id: 'book', name: 'สมุดบันทึก', price: 45 },
  { id: 'sticker', name: 'สติกเกอร์', price: 20 },
  { id: 'pin', name: 'เข็มกลัด', price: 35 },
]

function Shop() {
  const { add } = useCartLab()
  return (
    <div className="products">
      {products.map((item) => (
        <div className="product" key={item.id}>
          <b>{item.name}</b>
          <p>{item.price} บาท</p>
          <button className="btn" type="button" onClick={() => add(item)}>
            เพิ่มลงตะกร้า
          </button>
        </div>
      ))}
    </div>
  )
}

function CartBranch() {
  const { items, total } = useCartLab()
  const count = items.reduce((sum, item) => sum + item.qty, 0)
  const list = items.length === 0 ? 'ยังไม่มีสินค้า' : items.map((item) => `${item.name} ×${item.qty}`).join(' · ')

  return (
    <div className="branch-diagram">
      <div className="branch-top-card flow-card store">
        <span className="flow-title">ตะกร้า (กล่องเดียว)</span>
        <span className="flow-detail">{count === 0 ? 'ยังว่าง' : `${count} ชิ้น · ${total} บาท`}</span>
      </div>
      <svg className="branch-svg" viewBox="0 0 200 60" fill="none">
        <path d="M100 0 V18" stroke="currentColor" strokeWidth="2.4" />
        <path d="M100 18 L30 46" stroke="currentColor" strokeWidth="2.4" />
        <path d="M100 18 L170 46" stroke="currentColor" strokeWidth="2.4" />
        <path d="M30 46 L24 40 M30 46 L36 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M170 46 L164 40 M170 46 L176 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <div className="branch-bottom-row">
        <div className="flow-card consumer">
          <span className="flow-title">ยอดสรุปด้านบน</span>
          <span className="flow-detail">{count} ชิ้น · {total} บาท</span>
        </div>
        <div className="flow-card consumer">
          <span className="flow-title">รายการด้านล่าง</span>
          <span className="flow-detail">{list}</span>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------- */

export function Playground() {
  const { state, playgroundTotal } = useStudent()

  return (
    <section>
      <div className="kicker">แบบฝึกปฏิบัติ</div>
      <h1>ลองกดเอง แล้วดูทางเดินของข้อมูล</h1>
      <p className="lead">
        สามกิจกรรมนี้มีแผนภาพให้กดสลับหรือเปลี่ยนค่า ดูแผนภาพให้ทั่วก่อนตอบคำถามท้ายกิจกรรม
      </p>
      <p className="ok">
        ทำแล้ว {state.playgroundDone.length}/{playgroundTasks.length} ข้อ · ได้ {state.playgroundScore}/{playgroundTotal} คะแนน
      </p>

      <article className="card mt">
        <div className="tiny">กิจกรรมที่ 1</div>
        <h2>ชื่อผู้ใช้เดินทางถึงปลายทางได้กี่แบบ</h2>
        <p>สลับปุ่มสองอันนี้ แล้วนับดูว่าชื่อ “เมย์” ต้องผ่านกี่จุดกว่าจะถึงการ์ดโปรไฟล์</p>
        <NameFlowActivity />
        <TaskQuestion index={0} />
      </article>

      <article className="card mt">
        <div className="tiny">กิจกรรมที่ 2</div>
        <h2>ปุ่มเดียว เปลี่ยนสีได้ทั้งกรอบ</h2>
        <ThemeLabProvider>
          <p>กดเปลี่ยนโทนสี แล้วดูว่ากล่องกลางกับกรอบตัวอย่างเปลี่ยนพร้อมกันได้อย่างไร</p>
          <ThemeActivity />
        </ThemeLabProvider>
        <TaskQuestion index={1} />
      </article>

      <article className="card mt">
        <div className="tiny">กิจกรรมที่ 3</div>
        <h2>ตะกร้าใบเดียว สองจุดเห็นตรงกันเสมอ</h2>
        <CartLabProvider>
          <p>
            กดเพิ่มสินค้าด้านล่าง ยอดสรุปกับรายการสินค้าไม่ได้รับค่าจากกันเอง
            ทั้งสองจุดเปิดตะกร้ากล่องเดียวกันมาอ่าน ตัวเลขจึงตรงกันทุกครั้งโดยไม่ต้องมีใครคอยส่งค่าให้ใคร
          </p>
          <Shop />
          <CartBranch />
        </CartLabProvider>
        <TaskQuestion index={2} />
      </article>

      <article className="card mt">
        <div className="tiny">คำถามสรุป</div>
        <h2>รวบความเข้าใจจากสามกิจกรรม</h2>
        <TaskQuestion index={3} />
      </article>
    </section>
  )
}
