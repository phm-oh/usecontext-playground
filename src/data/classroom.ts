import { FULL_SCORE, PASS_SCORE, formatScore, mean } from '../lib/scoring'

export type ClassroomStudent = {
  no: number
  studentId: string
  title: string
  name: string
  pre: number
  post: number
  lessonsDone: number
  playground: number
}

export const classroomStudents: ClassroomStudent[] = [
  { no: 1, studentId: '01', title: 'นาย', name: 'จักรภพ ตรีรัตน์', pre: 13, post: 17, lessonsDone: 6, playground: 20 },
  { no: 2, studentId: '02', title: 'นาย', name: 'ชินดนัย ธัญญภู', pre: 8, post: 13, lessonsDone: 5, playground: 10 },
  { no: 3, studentId: '03', title: 'นาย', name: 'นันทสิทธิ์ จินดา', pre: 11, post: 15, lessonsDone: 6, playground: 15 },
  { no: 4, studentId: '04', title: 'นาย', name: 'ปฏิภาณ พรหมแสนปัง', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 5, studentId: '05', title: 'นาย', name: 'กมลเทพ โสภา', pre: 7, post: 12, lessonsDone: 4, playground: 10 },
  { no: 6, studentId: '06', title: 'นาย', name: 'ชัยวัฒน์ ชนะบุญ', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 7, studentId: '07', title: 'นาย', name: 'ณัฐกรณ์ อุเทนหลอย', pre: 12, post: 16, lessonsDone: 6, playground: 20 },
  { no: 8, studentId: '08', title: 'นาย', name: 'ติณณ์ภัทร เกาะแก้ว', pre: 8, post: 12, lessonsDone: 4, playground: 10 },
  { no: 9, studentId: '09', title: 'นาย', name: 'ธีรยุทธ สุดเต้', pre: 11, post: 15, lessonsDone: 6, playground: 20 },
  { no: 10, studentId: '10', title: 'นาย', name: 'ภูริภัทร์ สุรมะณี', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 11, studentId: '11', title: 'นาย', name: 'วรินทร หมื่นสุข', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 12, studentId: '12', title: 'นาย', name: 'ศิระวัฒน์ แก้วโงน', pre: 12, post: 15, lessonsDone: 6, playground: 15 },
  { no: 13, studentId: '13', title: 'นาย', name: 'ศิวปรีชา นิคม', pre: 11, post: 15, lessonsDone: 6, playground: 20 },
  { no: 14, studentId: '14', title: 'นาย', name: 'ศิวัฒน์ คำแก้ว', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 15, studentId: '15', title: 'นางสาว', name: 'กนกพิชญ์ ไชยสีดา', pre: 10, post: 15, lessonsDone: 6, playground: 20 },
  { no: 16, studentId: '16', title: 'นางสาว', name: 'กันนิชา ศาลาคำ', pre: 10, post: 15, lessonsDone: 6, playground: 20 },
  { no: 17, studentId: '17', title: 'นางสาว', name: 'พรวิภา โททวง', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 18, studentId: '18', title: 'นางสาว', name: 'รัตน์วรา สงนำมา', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 19, studentId: '19', title: 'นางสาว', name: 'สุนิษา บุญหมั่น', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 20, studentId: '20', title: 'นางสาว', name: 'อริยาภรณ์ อุดมฤทธิ์', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
]

const preScores = classroomStudents.map((s) => s.pre)
const postScores = classroomStudents.map((s) => s.post)
const passed = classroomStudents.filter((s) => s.post >= PASS_SCORE)

export const classroomStats = {
  count: classroomStudents.length,
  fullScore: FULL_SCORE,
  passScore: PASS_SCORE,
  pre: {
    mean: mean(preScores),
    max: Math.max(...preScores),
    min: Math.min(...preScores),
  },
  post: {
    mean: mean(postScores),
    max: Math.max(...postScores),
    min: Math.min(...postScores),
  },
  passed: passed.length,
  passRate: (passed.length / classroomStudents.length) * 100,
  gain: mean(postScores) - mean(preScores),
}

export function classroomStatText() {
  return {
    preMean: formatScore(classroomStats.pre.mean),
    postMean: formatScore(classroomStats.post.mean),
    passRate: formatScore(classroomStats.passRate),
    gain: formatScore(classroomStats.gain),
  }
}

export function fullName(student: ClassroomStudent) {
  return `${student.title}${student.name}`
}
