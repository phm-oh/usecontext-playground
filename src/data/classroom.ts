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
  { no: 1, studentId: '68319010005', title: 'นาย', name: 'กมลเทพ โสภา', pre: 7, post: 12, lessonsDone: 4, playground: 10 },
  { no: 2, studentId: '68319010006', title: 'นาย', name: 'ชัยวัฒน์ บุญช่วย', pre: 9, post: 14, lessonsDone: 6, playground: 15 },
  { no: 3, studentId: '68319010007', title: 'นาย', name: 'ธวัช ชุมพลวงศ์', pre: 12, post: 16, lessonsDone: 6, playground: 20 },
  { no: 4, studentId: '68319010008', title: 'นาย', name: 'ติณณ์ภัทร เกาะแก้ว', pre: 8, post: 12, lessonsDone: 4, playground: 10 },
  { no: 5, studentId: '68319010009', title: 'นาย', name: 'ธีรยุทธ ฤทธิ์เดช', pre: 11, post: 16, lessonsDone: 6, playground: 20 },
  { no: 6, studentId: '68319010012', title: 'นาย', name: 'วีรภัทร อุระมะ', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 7, studentId: '68319010013', title: 'นาย', name: 'วินัย หมื่นสุข', pre: 9, post: 15, lessonsDone: 6, playground: 15 },
  { no: 8, studentId: '68319010014', title: 'นาย', name: 'วัฒน์ แก้วไธสง', pre: 13, post: 17, lessonsDone: 6, playground: 20 },
  { no: 9, studentId: '68319010015', title: 'นาย', name: 'ปรีชา นิดสม', pre: 9, post: 14, lessonsDone: 5, playground: 15 },
  { no: 10, studentId: '68319010016', title: 'นาย', name: 'ศักดิ์นุ่น ศักดิ์', pre: 11, post: 15, lessonsDone: 6, playground: 15 },
  { no: 11, studentId: '68319010017', title: 'นางสาว', name: 'กนกพัชร สีดาภา', pre: 10, post: 15, lessonsDone: 6, playground: 20 },
  { no: 12, studentId: '68319010018', title: 'นางสาว', name: 'กันย์ธิดา ศาลาคำ', pre: 12, post: 17, lessonsDone: 6, playground: 20 },
  { no: 13, studentId: '68319010019', title: 'นางสาว', name: 'พรวิภา โกทาวงษ์', pre: 10, post: 14, lessonsDone: 6, playground: 15 },
  { no: 14, studentId: '68319010020', title: 'นางสาว', name: 'รัตนาวดี ส่งน้ำนวล', pre: 11, post: 16, lessonsDone: 6, playground: 20 },
  { no: 15, studentId: '68319010021', title: 'นางสาว', name: 'สุวรรณา บุญหมั่น', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 16, studentId: '68319010022', title: 'นางสาว', name: 'อริยาภรณ์ อุดมฤทธิ์', pre: 12, post: 15, lessonsDone: 6, playground: 15 },
  { no: 17, studentId: '68319010001', title: 'นางสาว', name: 'กนกพัชร ตรงศิริ', pre: 10, post: 15, lessonsDone: 6, playground: 15 },
  { no: 18, studentId: '68319010002', title: 'นาย', name: 'ชินดนัย ธัญญภู', pre: 8, post: 13, lessonsDone: 5, playground: 10 },
  { no: 19, studentId: '68319010003', title: 'นางสาว', name: 'นันท์ จินดาคำ', pre: 11, post: 15, lessonsDone: 6, playground: 20 },
  { no: 20, studentId: '68319010004', title: 'นางสาว', name: 'ปุ๊กกาน พรหมแสนป้อง', pre: 10, post: 14, lessonsDone: 6, playground: 15 },
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
