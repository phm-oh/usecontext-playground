import { Link } from 'react-router-dom'
import { scoreLevel } from '../lib/storage'

type Props = {
  title: string
  score: number
  total: number
  percent: number
  note?: string
  primaryTo?: string
  primaryLabel?: string
  onClose: () => void
}

export function ScoreModal({
  title,
  score,
  total,
  percent,
  note,
  primaryTo,
  primaryLabel,
  onClose,
}: Props) {
  const level = scoreLevel(percent)

  return (
    <div className="score-modal" role="dialog" aria-modal="true">
      <div className="score-card">
        <div className="kicker">แจ้งคะแนน</div>
        <h2>{title}</h2>
        <div className="score-big">{score}</div>
        <p>
          จาก {total} คะแนน · {percent}% · {level.label}
        </p>
        {note ? <p>{note}</p> : null}
        <div className="stack" style={{ justifyContent: 'center', marginTop: 18 }}>
          {primaryTo ? (
            <Link className="btn" to={primaryTo}>
              {primaryLabel ?? 'ไปต่อ'}
            </Link>
          ) : null}
          <button className="ghost" onClick={onClose} type="button">
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  )
}
