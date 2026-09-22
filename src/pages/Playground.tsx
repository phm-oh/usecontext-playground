import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ScoreModal } from '../components/ScoreModal'
import { useStudent } from '../context/StudentContext'
import { playgroundTasks } from '../data/quizzes'

type LabId = 'tree' | 'theme' | 'auth' | 'cart' | 'quiz'
type ThemeName = 'light' | 'dark' | 'sunset'
type Role = 'guest' | 'student' | 'teacher'

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

const AuthLabContext = createContext<{
  name: string
  role: Role
  login: (name: string, role: Role) => void
  logout: () => void
} | null>(null)

function AuthLabProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('ผู้เยี่ยมชม')
  const [role, setRole] = useState<Role>('guest')
  const value = useMemo(
    () => ({
      name,
      role,
      login: (nextName: string, nextRole: Role) => {
        setName(nextName)
        setRole(nextRole)
      },
      logout: () => {
        setName('ผู้เยี่ยมชม')
        setRole('guest')
      },
    }),
    [name, role],
  )
  return <AuthLabContext.Provider value={value}>{children}</AuthLabContext.Provider>
}

function useAuthLab() {
  const ctx = useContext(AuthLabContext)
  if (!ctx) throw new Error('useAuthLab ต้องอยู่ภายใน AuthLabProvider')
  return ctx
}

type CartItem = { id: string; name: string; price: number; qty: number }

const CartLabContext = createContext<{
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>) => void
  clear: () => void
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
    return { items, add, clear: () => setItems([]), total }
  }, [items])
  return <CartLabContext.Provider value={value}>{children}</CartLabContext.Provider>
}

function useCartLab() {
  const ctx = useContext(CartLabContext)
  if (!ctx) throw new Error('useCartLab ต้องอยู่ภายใน CartLabProvider')
  return ctx
}

function TreeLab() {
  const [mode, setMode] = useState<'drill' | 'context'>('drill')
  const user = 'เมย์ · ปวส.IT'

  return (
    <div className="grid-2">
      <div className="card">
        <h3>สลับวิธีส่งข้อมูล</h3>
        <p>ดูให้เห็นว่าชั้นกลางเป็นท่อส่งเมื่อใช้ props และหายไปเมื่อใช้ Context</p>
        <div className="stack">
          <button className={mode === 'drill' ? 'btn' : 'ghost'} type="button" onClick={() => setMode('drill')}>
            Prop Drilling
          </button>
          <button className={mode === 'context' ? 'btn' : 'ghost'} type="button" onClick={() => setMode('context')}>
            useContext
          </button>
        </div>
        <p className="mt">
          {mode === 'drill'
            ? 'App ส่ง user ลง Layout แล้วต่อ Header ก่อนถึง UserBadge'
            : 'UserProvider ครอบต้นไม้ UserBadge อ่านค่าเอง ไม่ผ่านชั้นกลาง'}
        </p>
      </div>
      <div className="card tree">
        <div className={`node ${mode === 'context' ? 'hot' : ''}`}>
          {mode === 'context' ? 'UserProvider value={user}' : `App ส่ง user="${user}"`}
        </div>
        <div className={`node ${mode === 'drill' ? 'pipe' : ''}`}>
          Layout {mode === 'drill' ? 'รับ user แล้วส่งต่อ' : 'ไม่ต้องรู้จัก user'}
        </div>
        <div className={`node ${mode === 'drill' ? 'pipe' : ''}`}>
          Header {mode === 'drill' ? 'รับ user แล้วส่งต่อ' : 'ไม่ต้องรู้จัก user'}
        </div>
        <div className="node hot">UserBadge แสดง: {user}</div>
      </div>
    </div>
  )
}

function ThemeButtons() {
  const { theme, setTheme } = useThemeLab()
  return (
    <div className="stack">
      {(['light', 'dark', 'sunset'] as ThemeName[]).map((item) => (
        <button key={item} className={theme === item ? 'btn' : 'ghost'} type="button" onClick={() => setTheme(item)}>
          {item}
        </button>
      ))}
    </div>
  )
}

function ThemePreview() {
  const { theme } = useThemeLab()
  return (
    <div className={`preview ${theme}`}>
      <div className="tiny">อ่านจาก useThemeLab()</div>
      <h3>กล่องนี้ไม่ได้ถูกลูกโซ่ props</h3>
      <p>ธีมปัจจุบันคือ {theme} ค่าเดินทางผ่าน ThemeLabContext</p>
    </div>
  )
}

function AuthPanel() {
  const { name, role, login, logout } = useAuthLab()
  const [draft, setDraft] = useState('ครูอร')

  return (
    <div className="card">
      <h3>ล็อกอินจำลอง</h3>
      <p>ตอนนี้อยู่ในบทบาท {role} ชื่อ {name}</p>
      <div className="form-grid">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} />
        <div className="stack">
          <button className="btn" type="button" onClick={() => login(draft || 'นักเรียน', 'student')}>
            เข้าสู่ระบบนักเรียน
          </button>
          <button className="btn gold" type="button" onClick={() => login(draft || 'ครู', 'teacher')}>
            เข้าสู่ระบบครู
          </button>
          <button className="ghost" type="button" onClick={logout}>
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  )
}

function AuthDashboard() {
  const { name, role } = useAuthLab()
  return (
    <div className="card">
      <h3>แดชบอร์ดที่อ่าน Context</h3>
      <p>สวัสดี {name}</p>
      {role === 'teacher' ? (
        <p className="ok">เมนูตรวจคะแนนโชว์แล้ว เพราะ role เป็นครู</p>
      ) : role === 'student' ? (
        <p>เห็นเฉพาะเมนูเรียนและ Playground</p>
      ) : (
        <p>โหมดผู้เยี่ยมชม ยังไม่เปิดเมนูส่วนตัว</p>
      )}
    </div>
  )
}

const products = [
  { id: 'book', name: 'สมุดแล็บ', price: 45 },
  { id: 'sticker', name: 'สติ๊กเกอร์ Context', price: 20 },
  { id: 'pin', name: 'เข็มกลัด Lab', price: 35 },
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
            หยิบใส่ตะกร้า
          </button>
        </div>
      ))}
    </div>
  )
}

function CartBar() {
  const { items, total, clear } = useCartLab()
  return (
    <div className="card">
      <h3>หัวบิลที่อยู่คนละกิ่ง</h3>
      <p>
        {items.length} รายการ · รวม {total} บาท
      </p>
      <button className="ghost" type="button" onClick={clear}>
        ล้างตะกร้า
      </button>
    </div>
  )
}

function CartList() {
  const { items, total } = useCartLab()
  return (
    <div className="card">
      <h3>รายการสินค้า</h3>
      {items.length === 0 ? <p>ยังไม่มีสินค้า</p> : null}
      {items.map((item) => (
        <p key={item.id}>
          {item.name} × {item.qty} = {item.price * item.qty} บาท
        </p>
      ))}
      <p className="ok">ยอดรวม {total} บาท</p>
    </div>
  )
}

export function Playground() {
  const { state, savePlaygroundTask, playgroundTotal } = useStudent()
  const [lab, setLab] = useState<LabId>('tree')
  const [flash, setFlash] = useState<{ score: number; total: number } | null>(null)

  const labs: { id: LabId; label: string }[] = [
    { id: 'tree', label: 'ต้นไม้ข้อมูล' },
    { id: 'theme', label: 'Theme Studio' },
    { id: 'auth', label: 'Auth Desk' },
    { id: 'cart', label: 'Mini Shop' },
    { id: 'quiz', label: 'โจทย์แล็บ' },
  ]

  return (
    <section>
      <div className="kicker">Playground · ลงมือกับ useContext จริง</div>
      <h1>ห้องปฏิบัติการ Context</h1>
      <p className="lead">
        ทุกแล็บทำงานด้วย Context ของตัวเอง แยกจาก StudentContext ของห้องเรียน
        ทำให้เห็นหลัก “หนึ่งเรื่องหนึ่งกล่อง” ตอนเปลี่ยนแท็บ
      </p>
      <div className="lab-tabs mt">
        {labs.map((item) => (
          <button key={item.id} className={lab === item.id ? 'active' : ''} type="button" onClick={() => setLab(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt">
        {lab === 'tree' ? <TreeLab /> : null}
        {lab === 'theme' ? (
          <ThemeLabProvider>
            <div className="grid-2">
              <div className="card">
                <h3>จ่ายค่าธีมจาก Provider</h3>
                <ThemeButtons />
              </div>
              <ThemePreview />
            </div>
          </ThemeLabProvider>
        ) : null}
        {lab === 'auth' ? (
          <AuthLabProvider>
            <div className="grid-2">
              <AuthPanel />
              <AuthDashboard />
            </div>
          </AuthLabProvider>
        ) : null}
        {lab === 'cart' ? (
          <CartLabProvider>
            <CartBar />
            <div className="mt">
              <Shop />
            </div>
            <div className="mt">
              <CartList />
            </div>
          </CartLabProvider>
        ) : null}
        {lab === 'quiz' ? (
          <div className="lesson-list">
            {playgroundTasks.map((task) => {
              const done = state.playgroundDone.includes(task.id)
              const picked = state.playgroundAnswers[task.id]
              return (
                <article className="card" key={task.id}>
                  <div className="tiny">{task.title} · {task.points} คะแนน</div>
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
                </article>
              )
            })}
            <p>
              คะแนนแล็บสะสม {state.playgroundScore}/{playgroundTotal}
              {' · '}
              <Link to="/posttest">ไปแบบทดสอบหลังเรียน</Link>
            </p>
          </div>
        ) : null}
      </div>

      {flash ? (
        <ScoreModal
          title="คะแนนโจทย์แล็บ"
          score={flash.score}
          total={flash.total}
          percent={Math.round((flash.score / flash.total) * 100)}
          note={`คะแนนแล็บรวมตอนนี้ ${state.playgroundScore + flash.score}/${playgroundTotal}`}
          onClose={() => setFlash(null)}
        />
      ) : null}
    </section>
  )
}
