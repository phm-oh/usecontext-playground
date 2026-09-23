import { NavLink, Outlet } from 'react-router-dom'
import { useStudent } from '../context/StudentContext'

const links = [
  { to: '/', label: 'หน้าแรก' },
  { to: '/pretest', label: 'ก่อนเรียน' },
  { to: '/lessons', label: 'บทเรียน' },
  { to: '/examples', label: 'ตัวอย่างโค้ด' },
  { to: '/playground', label: 'แบบฝึกปฏิบัติ' },
  { to: '/posttest', label: 'หลังเรียน' },
  { to: '/results', label: 'คะแนนที่ทำ' },
  { to: '/classroom', label: 'ผลทั้งชั้น' },
]

export function Layout() {
  const { progressPercent } = useStudent()

  return (
    <div>
      <header className="topbar">
        <div className="shell">
          <div className="topbar-inner">
            <NavLink to="/" className="brand">
              <span className="brand-mark">{'{ }'}</span>
              <span>
                ห้องเรียน useContext
                <small>ปวส. สาขาเทคโนโลยีสารสนเทศ</small>
              </span>
            </NavLink>
            <nav className="nav">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
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
