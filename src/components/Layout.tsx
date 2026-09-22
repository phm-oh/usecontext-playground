import { NavLink, Outlet } from 'react-router-dom'
import { useStudent } from '../context/StudentContext'

const links = [
  { to: '/', label: 'หน้าแรก' },
  { to: '/pretest', label: 'ก่อนเรียน' },
  { to: '/lessons', label: 'บทเรียน' },
  { to: '/playground', label: 'Playground' },
  { to: '/posttest', label: 'หลังเรียน' },
  { to: '/results', label: 'คะแนนฉัน' },
  { to: '/classroom', label: 'ผลชั้นเรียน' },
]

export function Layout() {
  const { state, progressPercent } = useStudent()

  return (
    <div>
      <header className="topbar">
        <div className="shell">
          <div className="topbar-inner">
            <NavLink to="/" className="brand">
              <span className="brand-mark">C</span>
              <span>
                Context Lab
                <small>ชุดสื่อ useContext · ปวส. เทคโนโลยีสารสนเทศ</small>
              </span>
            </NavLink>
            <nav className="nav">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="student-chip">
              {state.profile ? `${state.profile.name} · ${state.profile.studentId}` : 'ยังไม่ลงทะเบียน'}
            </div>
          </div>
          <div className="progress-track" aria-label="ความคืบหน้า">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </header>
      <main className="shell page">
        <Outlet />
      </main>
    </div>
  )
}
