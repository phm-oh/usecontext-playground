import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { PreTest } from './pages/PreTest'
import { Lessons } from './pages/Lessons'
import { LessonDetail } from './pages/LessonDetail'
import { Examples } from './pages/Examples'
import { Ebook } from './pages/Ebook'
import { Playground } from './pages/Playground'
import { PostTest } from './pages/PostTest'
import { Results } from './pages/Results'
import { Classroom } from './pages/Classroom'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pretest" element={<PreTest />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/ebook" element={<Ebook />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/posttest" element={<PostTest />} />
        <Route path="/results" element={<Results />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
