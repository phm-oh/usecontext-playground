import type { Lesson } from '../types'

export const lessons: Lesson[] = [
  {
    id: 'prop-drilling',
    order: 1,
    minutes: 8,
    title: 'ทำไมต้องมี Context',
    subtitle: 'เข้าใจปัญหา Prop Drilling ก่อนลงมือใช้เครื่องมือ',
    goal: 'อธิบายได้ว่าการส่ง props หลายชั้นสร้างปัญหาอย่างไร และเมื่อใดที่ควรหาทางเลือกอื่น',
    sections: [
      {
        type: 'text',
        title: 'ภาพรวม',
        body: 'ในงาน Front-End จริง ข้อมูลอย่างชื่อผู้ใช้ ธีมสี หรือภาษาของแอป มักถูกใช้ในหลายหน้าจอ หากส่งข้อมูลนั้นด้วย props จากพ่อแม่ไปลูก แล้วต่อไปยังหลาน ชั้นกลางหลายตัวจะกลายเป็นท่อส่งของที่ตัวเองไม่ได้ใช้ นี่คือ Prop Drilling และเป็นจุดที่นักเรียน ปวส. มักเชื่อมทฤษฎีกับโค้ดจริงไม่ติด',
      },
      {
        type: 'list',
        title: 'สัญญาณว่ากำลังเจอ Prop Drilling',
        items: [
          'คอมโพเนนต์กลางรับ props แล้วส่งต่ออย่างเดียว ไม่ได้นำไปแสดงผล',
          'เมื่อเปลี่ยนโครงสร้างหน้าจอ ต้องไล่แก้ props หลายไฟล์',
          'ฟังก์ชันเดียวกันถูกส่งผ่าน 4–5 ชั้น เช่น setTheme หรือ user',
          'อ่านโค้ดแล้วไม่รู้ว่าข้อมูลมาจากไหน เพราะชื่อ props ซ้ำกันทั่วแอป',
        ],
      },
      {
        type: 'code',
        title: 'ตัวอย่างที่ยังไม่ใช้ Context',
        caption: 'UserBadge ต้องการ user แต่ Header และ Layout เป็นแค่ท่อส่ง',
        code: `function App() {
  const user = { name: "เมย์", role: "นักเรียน" }
  return <Layout user={user} />
}

function Layout({ user }) {
  return <Header user={user} />
}

function Header({ user }) {
  return <UserBadge user={user} />
}

function UserBadge({ user }) {
  return <b>{user.name}</b>
}`,
      },
      {
        type: 'callout',
        tone: 'lab',
        title: 'เชื่อมทฤษฎีกับการปฏิบัติ',
        body: 'ลองนับจำนวนชั้นที่ props เดินทางในโปรเจกต์ของตนเอง ถ้าเกิน 2 ชั้นแล้วชั้นกลางไม่ใช้ค่า แสดงว่าโจทย์นี้เหมาะกับ Context',
      },
      {
        type: 'text',
        title: 'ข้อควรจำก่อนเข้าบทถัดไป',
        body: 'props ยังจำเป็นและดีที่สุดเมื่อข้อมูลไหลใกล้ ๆ กัน Context ไม่ได้มาแทน props ทุกจุด แต่มาช่วยเมื่อข้อมูลถูกใช้ร่วมกันในหลายจุดของต้นไม้คอมโพเนนต์',
      },
    ],
    recap: [
      'Prop Drilling คือการส่ง props ผ่านชั้นที่ไม่ใช้ค่านั้น',
      'ปัญหาคือโค้ดยาว แก้ยาก และคอมโพเนนต์ผูกกันเกินไป',
      'Context ถูกออกแบบมาเพื่อแชร์ข้อมูลข้ามชั้นได้อย่างตรงจุด',
    ],
    check: [
      {
        id: 'l1-q1',
        prompt: 'ข้อใดคือ Prop Drilling',
        choices: [
          'การใช้ CSS ส่งค่าสีผ่านตัวแปร',
          'การส่ง props ผ่านหลายชั้นแม้ชั้นกลางไม่ใช้',
          'การเรียก API ใน useEffect',
          'การแยกไฟล์คอมโพเนนต์',
        ],
        answer: 1,
        explain: 'หัวใจของ Prop Drilling คือชั้นกลางกลายเป็นท่อส่งข้อมูล',
      },
      {
        id: 'l1-q2',
        prompt: 'เมื่อใดยังควรใช้ props แทน Context',
        choices: [
          'เมื่อข้อมูลใช้แค่พ่อแม่กับลูกใกล้ ๆ',
          'เมื่อทั้งแอปต้องรู้ธีมสี',
          'เมื่อมีผู้ใช้ล็อกอินอยู่ทุกหน้า',
          'เมื่ออยากลดจำนวนไฟล์',
        ],
        answer: 0,
        explain: 'ข้อมูลระยะใกล้ใช้ props ชัดกว่า อ่านง่ายกว่า และไม่ทำให้ทั้งต้นไม้ re-render โดยไม่จำเป็น',
      },
    ],
  },
  {
    id: 'context-api',
    order: 2,
    minutes: 9,
    title: 'Context API คืออะไร',
    subtitle: 'createContext สร้างช่องทางข้อมูลกลางของต้นไม้คอมโพเนนต์',
    goal: 'สร้าง Context ได้ และอธิบายบทบาทของ default value กับ Provider',
    sections: [
      {
        type: 'text',
        title: 'แนวคิดหลัก',
        body: 'Context คือช่องทางส่งข้อมูลจากจุดหนึ่งไปยังคอมโพเนนต์ที่อยู่ลึกโดยไม่ต้องส่ง props ทีละชั้น ประกอบด้วย 3 ส่วนที่ต้องจำให้ขึ้นใจ: สร้าง Context, ห่อด้วย Provider, และอ่านค่าด้วย useContext',
      },
      {
        type: 'code',
        title: 'สร้าง Context',
        caption: 'ค่าในวงเล็บคือค่าเริ่มต้น ใช้เมื่อไม่มี Provider ครอบอยู่',
        code: `import { createContext } from 'react'

type Theme = 'light' | 'dark'

export const ThemeContext = createContext<Theme>('light')`,
      },
      {
        type: 'list',
        title: 'บทบาทของแต่ละชิ้น',
        items: [
          'createContext(defaultValue) สร้างกล่องข้อมูลและกำหนดค่าสำรอง',
          'ThemeContext.Provider ส่ง value จริงให้ลูกหลาน',
          'useContext(ThemeContext) อ่านค่าจาก Provider ที่ใกล้ที่สุด',
          'ถ้าไม่มี Provider ครอบอยู่ จะได้ค่า default ที่ใส่ตอนสร้าง',
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'ตั้งชื่อให้สื่องาน',
        body: 'ตั้งชื่อตามโดเมน เช่น ThemeContext, AuthContext, CartContext อย่าสร้าง AppContext ก้อนเดียวแล้วยัดทุกอย่างลงไป เพราะจะทำให้เหตุผลของ re-render ตามยาก',
      },
      {
        type: 'text',
        title: 'ค่า default ไม่ใช่ค่าของแอปจริง',
        body: 'นักเรียนมักเข้าใจผิดว่าค่าใน createContext คือค่าที่ทั้งแอปใช้ จริง ๆ แล้วค่าหลักมาจาก value ของ Provider ค่า default มีไว้กันพลาดและช่วยตอนทดสอบยูนิตเล็ก ๆ ที่ไม่ได้ห่อ Provider',
      },
    ],
    recap: [
      'Context = ช่องทางข้อมูลกลาง ไม่ใช่ฐานข้อมูล',
      'จำสูตร 3 จังหวะ: create → provide → consume',
      'default value ใช้เมื่อไม่มี Provider ไม่ใช่ค่าหลักของแอป',
    ],
    check: [
      {
        id: 'l2-q1',
        prompt: 'createContext("light") ค่า "light" คืออะไร',
        choices: [
          'ค่าที่ Provider ต้องใช้เสมอ',
          'ค่าเริ่มต้นเมื่อไม่มี Provider ครอบ',
          'ชื่อของ Context',
          'ค่าที่บันทึกลง localStorage',
        ],
        answer: 1,
        explain: 'เป็นค่าสำรองเมื่ออ่าน Context นอก Provider',
      },
      {
        id: 'l2-q2',
        prompt: 'ลำดับที่ถูกต้องของการใช้ Context คือข้อใด',
        choices: [
          'useContext → createContext → Provider',
          'Provider → useContext → createContext',
          'createContext → Provider → useContext',
          'createContext → useContext → Provider',
        ],
        answer: 2,
        explain: 'ต้องสร้างก่อน แล้วส่งค่า แล้วค่อยอ่าน',
      },
    ],
  },
  {
    id: 'provider',
    order: 3,
    minutes: 10,
    title: 'Provider และ value',
    subtitle: 'จุดจ่ายข้อมูลของต้นไม้คอมโพเนนต์',
    goal: 'ห่อ Provider ได้ เลือกขอบเขตที่ถูกต้อง และออกแบบ value ให้ชัด',
    sections: [
      {
        type: 'text',
        title: 'Provider คือสถานีจ่ายค่า',
        body: 'คอมโพเนนต์ที่อยู่ภายใน Provider เท่านั้นที่อ่านค่าล่าสุดได้ ขอบเขตของ Provider จึงสำคัญ ถ้าวางสูงเกินไป ทั้งแอปจะผูกกับค่านั้น ถ้าวางต่ำเกินไป หน้าที่ต้องการข้อมูลจะอ่านไม่ถึง',
      },
      {
        type: 'code',
        title: 'ห่อ Provider ในระดับที่เหมาะสม',
        caption: 'ตัวอย่างนี้จ่ายธีมให้ทั้งแอป และจ่ายตะกร้าเฉพาะโซนร้านค้า',
        code: `function Root() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <CartProvider>
            <ShopPage />
          </CartProvider>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}`,
      },
      {
        type: 'list',
        title: 'ออกแบบ value ให้ใช้งานได้จริง',
        items: [
          'ส่งทั้งข้อมูลและฟังก์ชันปรับข้อมูล เช่น theme กับ setTheme',
          'หลีกเลี่ยงการสร้าง object ใหม่ใน JSX ทุกครั้งถ้าทำให้ทั้งต้นไม้สั่น',
          'แยก Context ตามเรื่อง เช่น ธีม คนละก้อนกับตะกร้าสินค้า',
          'อย่าเก็บค่าที่คำนวณจาก props ระยะใกล้ไว้ใน Context โดยไม่จำเป็น',
        ],
      },
      {
        type: 'code',
        title: 'value ที่ครบทั้งอ่านและเขียน',
        code: `const ThemeContext = createContext(null)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const value = { theme, setTheme, toggle: () =>
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Provider ซ้อนกันใครชนะ',
        body: 'useContext อ่านจาก Provider ที่ใกล้ที่สุดด้านบน หากห่อ ThemeProvider อีกชั้นด้านใน ค่าชั้นในจะทับชั้นนอก นี่มีประโยชน์ตอนทำโซนพิเศษ เช่น พรีวิวธีมใน Playground',
      },
    ],
    recap: [
      'ขอบเขต Provider กำหนดว่าใครอ่านค่าได้',
      'value ควรมีทั้งข้อมูลและวิธีเปลี่ยนข้อมูล',
      'Provider ชั้นในทับชั้นนอกเมื่อซ้อนกัน',
    ],
    check: [
      {
        id: 'l3-q1',
        prompt: 'ถ้ามี Provider สองชั้นซ้อนกัน useContext จะได้อะไร',
        choices: [
          'ค่าจาก Provider ชั้นนอกเสมอ',
          'ค่าจาก Provider ที่ใกล้ที่สุด',
          'ค่าจากทั้งสองชั้นรวมกัน',
          'ค่า default เท่านั้น',
        ],
        answer: 1,
        explain: 'React เดินขึ้นต้นไม้แล้วหยิบ Provider แรกที่เจอ',
      },
      {
        id: 'l3-q2',
        prompt: 'ข้อใดเป็นแนวทางวาง Provider ที่ดี',
        choices: [
          'ห่อทั้งเว็บด้วย CartProvider แม้ไม่มีร้านค้า',
          'วาง Provider ใกล้กับโซนที่ต้องใช้ค่านั้น',
          'ใส่ทุก state ลง Provider เดียวที่ App',
          'ห้ามมี Provider เกินหนึ่งตัว',
        ],
        answer: 1,
        explain: 'วางใกล้จุดใช้งาน จะอ่านเจตนาของโค้ดง่ายและลด re-render ส่วนที่ไม่เกี่ยว',
      },
    ],
  },
  {
    id: 'usecontext',
    order: 4,
    minutes: 10,
    title: 'useContext ทีละขั้น',
    subtitle: 'อ่านค่าจาก Context อย่างปลอดภัยและอ่านง่าย',
    goal: 'เรียก useContext ได้ ตรวจว่าอยู่ภายใน Provider และนำค่าไปเรนเดอร์จริง',
    sections: [
      {
        type: 'text',
        title: 'ลายเซ็นของฮุก',
        body: 'useContext(SomeContext) คืนค่า value ของ Provider ที่ใกล้ที่สุด ถ้าไม่มี Provider จะคืนค่า default การเรียกฮุกต้องอยู่บนสุดของฟังก์ชันคอมโพเนนต์ ห้ามอยู่ใน if หรือลูป',
      },
      {
        type: 'code',
        title: 'อ่านค่าแล้วใช้งาน',
        code: `import { useContext } from 'react'
import { ThemeContext } from './theme-context'

function ThemeLabel() {
  const theme = useContext(ThemeContext)
  return <p>ธีมปัจจุบัน: {theme}</p>
}`,
      },
      {
        type: 'code',
        title: 'รูปแบบที่แนะนำ: custom hook',
        caption: 'ซ่อนรายละเอียดและโยนข้อความภาษาไทยเมื่อใช้นอก Provider',
        code: `function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme ต้องอยู่ภายใน ThemeProvider')
  }
  return ctx
}

function ToggleButton() {
  const { theme, toggle } = useTheme()
  return <button onClick={toggle}>{theme}</button>
}`,
      },
      {
        type: 'list',
        title: 'กฎที่ต้องทำให้ติดมือ',
        items: [
          'ส่งตัว Context เข้า useContext ไม่ใช่ส่ง value',
          'อย่าเรียก useContext ในเงื่อนไข เพราะผิดกฎของฮุก',
          'ถ้า TypeScript บอกว่า ctx อาจเป็น null ให้ตรวจก่อนใช้งาน',
          'แอปนี้ใช้รูปแบบเดียวกันกับข้อมูลนักเรียน ดูได้จากเมนูด้านบน',
        ],
      },
      {
        type: 'callout',
        tone: 'lab',
        title: 'แอปนี้เป็นตัวอย่างมีชีวิต',
        body: 'ชื่อ รหัสนักศึกษา และคะแนนถูกเก็บใน StudentContext เมื่อเปลี่ยนหน้า ค่าไม่หายเพราะทุกหน้าอยู่ภายใต้ StudentProvider นี่คือการเชื่อมทฤษฎีกับปฏิบัติในระบบจริง',
      },
    ],
    recap: [
      'useContext อ่านค่าจาก Provider ที่ใกล้ที่สุด',
      'custom hook ช่วยตรวจขอบเขตและทำให้หน้าจออ่านง่าย',
      'ฮุกต้องอยู่ระดับบนสุดของคอมโพเนนต์เสมอ',
    ],
    check: [
      {
        id: 'l4-q1',
        prompt: 'useContext ต้องรับอะไรเป็นอาร์กิวเมนต์',
        choices: [
          'ค่า value ของ Provider',
          'ตัว Context ที่ได้จาก createContext',
          'ชื่อคอมโพเนนต์',
          'ฟังก์ชัน setState',
        ],
        answer: 1,
        explain: 'ส่งอ็อบเจ็กต์ Context ไม่ใช่ค่าข้างใน',
      },
      {
        id: 'l4-q2',
        prompt: 'ข้อดีของ useTheme() เทียบกับเรียก useContext ตรง ๆ คืออะไร',
        choices: [
          'ทำงานเร็วกว่าเสมอ',
          'ไม่ต้อง import React',
          'ซ่อนรายละเอียดและตรวจว่าอยู่ภายใน Provider',
          'ทำให้ไม่ต้องมี Provider',
        ],
        answer: 2,
        explain: 'custom hook คือชั้นที่ทำให้ทีมใช้ Context ได้ปลอดภัยขึ้น',
      },
    ],
  },
  {
    id: 'structure',
    order: 5,
    minutes: 9,
    title: 'จัดโครงสร้าง Context ในโปรเจกต์จริง',
    subtitle: 'แยกไฟล์ แยกเรื่อง และตั้งชื่อให้ทีมทำงานต่อได้',
    goal: 'วางโครงสร้างโฟลเดอร์และแยก Context ตามโดเมนได้อย่างเป็นระบบ',
    sections: [
      {
        type: 'text',
        title: 'จากบทเรียนสู่การจัดการพัฒนาซอฟต์แวร์',
        body: 'การจัดการพัฒนา Front-End ไม่ได้จบที่ทำให้ของโชว์ได้ ทีมต้องอ่านโค้ดต่อ แก้บั๊ก และส่งมอบได้ Context ที่ดีจึงต้องมีที่อยู่ชัด ชื่อสื่องาน และขอบเขตรับผิดชอบเดียวต่อหนึ่งเรื่อง',
      },
      {
        type: 'code',
        title: 'โครงสร้างโฟลเดอร์ที่แนะนำ',
        code: `src/
  context/
    StudentContext.tsx
    ThemeContext.tsx
    CartContext.tsx
  pages/
  components/
  data/`,
      },
      {
        type: 'list',
        title: 'หลักแยก Context',
        items: [
          'หนึ่งเรื่องหนึ่งกล่อง: ธีม คนละกล่องกับตะกร้า และคนละกล่องกับผู้ใช้',
          'ไฟล์หนึ่งไฟล์ควรมี createContext + Provider + custom hook',
          'หน้าจอเรียกเฉพาะฮุก เช่น useStudent() ไม่แตะ Context ตรง ๆ',
          'อย่าให้คอมโพเนนต์เล็กไปพึ่ง Context หลายกล่องโดยไม่จำเป็น',
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'เชื่อมกับวงจรพัฒนา',
        body: 'ก่อนลงมือเขียน ให้นักเรียนตอบ 3 คำถาม: ใครต้องอ่านค่านี้, ค่านี้เปลี่ยนบ่อยแค่ไหน, และถ้าไม่มี Context จะส่ง props กี่ชั้น หากคำตอบชัด การเลือกเครื่องมือจะไม่เดา',
      },
      {
        type: 'text',
        title: 'บันทึกค่าไว้ระหว่างรีเฟรช',
        body: 'Context เองไม่จำค่าหลังรีเฟรชหน้า ถ้าต้องการจำชื่อนักเรียนหรือคะแนน ให้ Provider โหลด/บันทึก localStorage เอง บทบาทของ Context คือกระจายค่า ไม่ใช่เป็นฐานข้อมูล',
      },
    ],
    recap: [
      'แยก Context ตามโดเมน ไม่ยัดทุกอย่างลงกล่องเดียว',
      'ทีมควรถามก่อนว่าใครใช้ ค่าเปลี่ยนบ่อยแค่ไหน และ props พอหรือยัง',
      'การจำค่าข้ามรีเฟรชเป็นหน้าที่ของ storage ไม่ใช่ Context',
    ],
    check: [
      {
        id: 'l5-q1',
        prompt: 'เหตุใดจึงไม่ควรมี AppContext ก้อนเดียวที่เก็บทุกอย่าง',
        choices: [
          'React ห้ามมี Context เกินหนึ่งตัว',
          'ค่าทุกอย่างจะเปลี่ยนพร้อมกันและตามยาก',
          'TypeScript ไม่รองรับ',
          'Provider ใช้ได้แค่หน้าเดียว',
        ],
        answer: 1,
        explain: 'กล่องใหญ่ทำให้คอมโพเนนต์ที่ไม่เกี่ยว re-render และออกแบบรับผิดชอบไม่ชัด',
      },
      {
        id: 'l5-q2',
        prompt: 'Context จำค่าหลังรีเฟรชหน้าเองหรือไม่',
        choices: [
          'จำเสมอ',
          'จำเฉพาะในโหมด production',
          'ไม่จำ ต้องบันทึกที่ storage เองถ้าต้องการ',
          'จำเฉพาะค่า default',
        ],
        answer: 2,
        explain: 'Context อยู่ในหน่วยความจำของรอบการทำงานนั้น รีเฟรชแล้วเริ่มใหม่',
      },
    ],
  },
  {
    id: 'pitfalls',
    order: 6,
    minutes: 10,
    title: 'เมื่อไรควรใช้ และข้อควรระวัง',
    subtitle: 'เลือกเครื่องมือเป็น และเลี่ยงกับดักที่พบบ่อยในชั้น ปวส.',
    goal: 'ตัดสินใจได้ว่าโจทย์นี้ควรใช้ props, Context หรือเครื่องมือสถานะอื่น',
    sections: [
      {
        type: 'list',
        title: 'เหมาะกับ Context',
        items: [
          'ธีม สี และโหมดสว่าง/มืด ที่หลายหน้าต้องรู้',
          'สถานะผู้ใช้ที่ล็อกอิน และสิทธิ์เบื้องต้น',
          'ภาษาของอินเทอร์เฟซ',
          'ตะกร้าสินค้าหรือค่าตั้งค่าที่กระจายหลายจุด',
        ],
      },
      {
        type: 'list',
        title: 'ยังไม่ต้องใช้ Context',
        items: [
          'ฟอร์มสั้นที่ค่าอยู่หน้าเดียว',
          'การนับคลิกของปุ่มเดียว',
          'ข้อมูลที่ส่งให้ลูกชั้นเดียวแล้วจบ',
          'สถานะชั่วคราวของโมดัลที่ปิดแล้วหาย',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'กับดัก re-render',
        body: 'เมื่อ value ของ Provider เปลี่ยน คอมโพเนนต์ที่เรียก useContext ของกล่องนั้นจะเรนเดอร์ใหม่ทั้งหมด หากใส่ค่าที่เปลี่ยนทุกครั้ง เช่น object ใหม่ใน JSX โดยไม่จำเป็น หน้าจะทำงานหนักโดยที่ผู้ใช้ไม่เห็นประโยชน์',
      },
      {
        type: 'code',
        title: 'ทำให้ value คงที่ขึ้นด้วย useMemo',
        caption: 'ใช้เมื่อ value เป็นอ็อบเจ็กต์และทำให้เกิดเรนเดอร์เกินจำเป็น',
        code: `const value = useMemo(
  () => ({ theme, setTheme }),
  [theme]
)`,
      },
      {
        type: 'text',
        title: 'อย่าใช้ Context แทนทุกอย่าง',
        body: 'งานที่ข้อมูลซับซ้อน มีแคช มีการซิงค์เซิร์ฟเวอร์ อาจเหมาะกับไลบรารีจัดการสถานะอื่น แต่สำหรับโจทย์ชั้น ปวส. ที่ต้องการเชื่อมทฤษฎีกับปฏิบัติ Context คือเครื่องมือมาตรฐานที่ต้องใช้เป็นก่อน เพราะอยู่ใน React เอง ไม่ต้องติดตั้งเพิ่ม และอธิบายเป็นวงจรพัฒนาได้ชัด',
      },
    ],
    recap: [
      'ใช้ Context เมื่อข้อมูลถูกอ่านหลายจุดในต้นไม้',
      'อย่าใส่ทุก state ลงกล่องเดียว',
      'ระวัง object ใหม่ใน value เพราะทำให้เรนเดอร์เกินจำเป็น',
    ],
    check: [
      {
        id: 'l6-q1',
        prompt: 'สถานการณ์ใดเหมาะกับ Context มากที่สุด',
        choices: [
          'นับจำนวนคลิกปุ่มเดียว',
          'ธีมสีที่ทั้งเฮดเดอร์และหน้าเนื้อหาต้องใช้',
          'ข้อความในอินพุตของฟอร์มล็อกอิน',
          'ค่าชั่วคราวตอนโฮเวอร์ไอคอน',
        ],
        answer: 1,
        explain: 'ธีมถูกอ่านหลายจุดและอยู่คนละกิ่งของต้นไม้',
      },
      {
        id: 'l6-q2',
        prompt: 'value={{ user }} เขียนใน JSX ตรง ๆ เสี่ยงอะไร',
        choices: [
          'สร้างอ็อบเจ็กต์ใหม่ทุกครั้งที่เรนเดอร์',
          'ทำให้ Context หาย',
          'ทำให้ TypeScript error เสมอ',
          'ห้ามใช้ใน React 18',
        ],
        answer: 0,
        explain: 'อ็อบเจ็กต์ใหม่ = อ้างอิงใหม่ = ผู้บริโภคอาจเรนเดอร์ใหม่แม้ข้อมูลด้านในเหมือนเดิม',
      },
    ],
  },
]

export function getLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id)
}
