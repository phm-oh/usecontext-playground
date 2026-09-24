export type EbookSection =
  | { type: 'text'; title?: string; body: string }
  | { type: 'list'; title: string; items: string[] }
  | { type: 'code'; title?: string; caption?: string; code: string }
  | { type: 'table'; title?: string; head: [string, string]; rows: [string, string][] }
  | { type: 'callout'; tone: 'tip' | 'warn'; title: string; body: string }

export type EbookChapter = {
  id: string
  order: number
  title: string
  sections: EbookSection[]
}

export const ebookMeta = {
  title: 'คู่มือประกอบการเรียนรู้ (E-book)',
  subtitle: 'การทำงานของ useState ในการจัดเก็บค่าตัวแปรที่เปลี่ยนแปลงค่าได้',
  course: 'รายวิชา การพัฒนาซอฟต์แวร์ด้วยเทคโนโลยี Front-End · ปวส. สาขาเทคโนโลยีสารสนเทศ',
  author: 'นายภาณุเมศ ชุมภูนท์ ครูชำนาญการพิเศษ วิทยาลัยอาชีวศึกษาอุดรธานี',
  driveUrl: 'https://drive.google.com/file/d/1dT9AXhb6eCDLEIApWmzzQbgK0RcLjTTv/view',
  intro:
    'ก่อนจะเรียน useContext ในชุดสื่อนี้ นักเรียนควรคุ้นเคยกับ useState มาก่อน เพราะ useContext ส่วนใหญ่ทำงานร่วมกับค่า state ที่เก็บด้วย useState เอกสารนี้สรุปเนื้อหา useState ไว้ให้อ่านทบทวน ถ้าเคยเรียนมาแล้วข้ามไปเริ่มบทเรียน useContext ได้เลย',
}

export const ebookChapters: EbookChapter[] = [
  {
    id: 'basics',
    order: 1,
    title: 'ปูพื้นฐานก่อนเข้าสู่ useState',
    sections: [
      {
        type: 'text',
        title: 'React กับ Component คืออะไร',
        body: 'React คือไลบรารี JavaScript สำหรับสร้างหน้าตาเว็บ โดยแบ่งหน้าเว็บออกเป็นชิ้นเล็ก ๆ เรียกว่า Component แต่ละชิ้นดูแลการแสดงผลของตัวเอง และเอาไปใช้ซ้ำได้หลายที่ เช่น ปุ่มกด ช่องกรอกข้อมูล หรือการ์ดแสดงสินค้า ล้วนเขียนเป็น Component แยกกันได้',
      },
      {
        type: 'text',
        title: 'ทำไมตัวแปรธรรมดาใช้ไม่ได้',
        body: 'พอเริ่มเขียน Component แล้วอยากเก็บค่าที่เปลี่ยนได้ เช่น ตัวนับ หรือข้อความที่พิมพ์ หลายคนลองประกาศด้วย let หรือ const ก่อน แต่จะเจอปัญหา คือพอเปลี่ยนค่าตัวแปรแล้ว หน้าจอไม่ยอมอัปเดตให้เอง',
      },
      {
        type: 'code',
        caption: 'กดปุ่มกี่ครั้ง ตัวเลขบนจอก็ไม่ขยับ ทั้งที่ count เปลี่ยนค่าจริงในคอนโซล',
        code: `function Counter() {
  let count = 0;

  function handleClick() {
    count = count + 1;
    console.log(count); // ค่าจริงเปลี่ยน แต่หน้าจอไม่เปลี่ยน
  }

  return <button onClick={handleClick}>ค่า: {count}</button>;
}`,
      },
      {
        type: 'text',
        body: 'สาเหตุคือ React จะสั่งวาดหน้าจอใหม่ (re-render) ก็ต่อเมื่อค่าที่เปลี่ยนนั้นเปลี่ยนผ่านกลไกที่ React รู้จักเท่านั้น การแก้ตัวแปรธรรมดาตรง ๆ จึงไม่มีผลอะไรกับหน้าจอเลย',
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'สรุปสำคัญ',
        body: 'State คือ “หน่วยความจำ” ของ Component ที่เปลี่ยนค่าได้ ตัวอย่างเช่น จำนวนสินค้าในตะกร้า สถานะเปิด/ปิดเมนู หรือข้อความในช่องค้นหา และการเปลี่ยนค่า State อย่างถูกวิธีคือกุญแจที่ทำให้หน้าจออัปเดตถูกต้อง',
      },
    ],
  },
  {
    id: 'hook',
    order: 2,
    title: 'รู้จัก useState Hook',
    sections: [
      {
        type: 'text',
        title: 'useState คืออะไร',
        body: 'useState เป็นฟังก์ชันชนิดหนึ่งที่เรียกว่า Hook ซึ่ง React เตรียมไว้ให้สร้างและจัดการค่า State ภายใน Function Component ต้อง import เข้ามาก่อนใช้งาน',
      },
      {
        type: 'code',
        code: `import { useState } from "react";

const [state, setState] = useState(initialValue);`,
      },
      {
        type: 'table',
        title: 'ส่วนประกอบของ useState',
        head: ['ส่วนประกอบ', 'ความหมาย'],
        rows: [
          ['state', 'ตัวแปรที่เก็บค่าปัจจุบัน อ่านค่าได้อย่างเดียว ห้ามแก้ไขตรง ๆ'],
          ['setState', 'ฟังก์ชันที่ใช้ “สั่งเปลี่ยนค่า” ของ state เท่านั้น'],
          ['initialValue', 'ค่าเริ่มต้นของ state ตอนที่ Component ถูกสร้างครั้งแรก'],
        ],
      },
      {
        type: 'list',
        title: 'กฎสำคัญที่ต้องจำ',
        items: [
          'เรียก useState ได้เฉพาะภายใน Function Component เท่านั้น',
          'ห้ามเรียก useState ในเงื่อนไข (if) หรือในลูป (for/while)',
          'ต้องเรียกในลำดับเดียวกันทุกครั้งที่ Component แสดงผล',
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'เกร็ดความรู้',
        body: 'ตั้งชื่อ state และ setState ตามความหมายของข้อมูลได้เลย เช่น const [count, setCount] หรือ const [name, setName] ขอแค่ชื่อสื่อความหมายชัดเจน',
      },
    ],
  },
  {
    id: 'update',
    order: 3,
    title: 'การจัดเก็บและเปลี่ยนแปลงค่าตัวแปร',
    sections: [
      {
        type: 'text',
        body: 'บทนี้คือหัวใจของเล่มนี้ เป้าหมายคือทำให้กำหนดค่าตัวแปรที่เปลี่ยนแปลงได้ผ่าน useState อย่างถูกต้อง การอ่านค่าเรียกชื่อตัวแปรตรง ๆ ได้เลย แต่การเปลี่ยนค่าต้องเรียกผ่านฟังก์ชัน setState เท่านั้น ห้ามกำหนดค่าให้ state ตรง ๆ เด็ดขาด',
      },
      {
        type: 'code',
        code: `const [count, setCount] = useState(0);

// ผิด: ห้ามกำหนดค่าตรง ๆ
count = count + 1;

// ถูกต้อง: ต้องเรียกผ่านฟังก์ชัน setter
setCount(count + 1);`,
      },
      {
        type: 'text',
        title: 'ตัวอย่างที่ 1 — ตัวนับจำนวน',
        body: 'มีปุ่มเพิ่มค่า ลดค่า และรีเซ็ตกลับเป็นศูนย์ ทุกครั้งที่กด “เพิ่มค่า +1” ฟังก์ชัน setCount ถูกเรียก React จึงรู้ว่าค่า state เปลี่ยน แล้วสั่งวาดตัวเลขใหม่ให้เองโดยไม่ต้องเขียนโค้ดอัปเดตหน้าจอเพิ่ม',
      },
      {
        type: 'code',
        code: `const [count, setCount] = useState(0);

<p>ค่าปัจจุบัน: {count}</p>
<button onClick={() => setCount(count - 1)}>ลดค่า -1</button>
<button onClick={() => setCount(count + 1)}>เพิ่มค่า +1</button>
<button onClick={() => setCount(0)}>รีเซ็ต</button>`,
      },
      {
        type: 'text',
        title: 'ตัวอย่างที่ 2 — ค่าจริง/เท็จ (boolean)',
        body: 'ใช้กับสถานะเปิด/ปิด เช่น สวิตช์ หรือซ่อน/แสดงเมนู เทคนิคที่ใช้บ่อยคือเครื่องหมาย ! เพื่อกลับค่าตรงข้ามในบรรทัดเดียว',
      },
      {
        type: 'code',
        code: `const [isOn, setIsOn] = useState(false);

<p>สถานะ: {isOn ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
<button onClick={() => setIsOn(!isOn)}>
  {isOn ? "ปิด" : "เปิด"}
</button>`,
      },
      {
        type: 'text',
        title: 'ตัวอย่างที่ 3 — ข้อความ (string)',
        body: 'ข้อความที่ต้องอัปเดตตามการพิมพ์แบบทันที ใช้ state คู่กับ event onChange ของช่องกรอก แบบนี้เรียกว่า Controlled Input ซึ่งเป็นรูปแบบมาตรฐานของ React',
      },
      {
        type: 'code',
        code: `const [text, setText] = useState("");

<input
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="พิมพ์อะไรก็ได้..."
/>
<p>คุณพิมพ์ว่า: {text}</p>`,
      },
    ],
  },
  {
    id: 'complex-state',
    order: 4,
    title: 'การจัดการ State ที่ซับซ้อนขึ้น',
    sections: [
      {
        type: 'text',
        title: 'อัปเดต State ชนิด Object',
        body: 'เมื่อ state เป็น Object ที่มีหลายฟิลด์ เช่น ข้อมูลผู้ใช้ ห้ามแก้ไข Object เดิมตรง ๆ (mutation) เพราะ React จะตรวจไม่พบการเปลี่ยนแปลงและไม่วาดหน้าจอใหม่ให้ ต้องสร้าง Object ใหม่ด้วยการ spread ค่าเดิมออกมาก่อน',
      },
      {
        type: 'code',
        code: `const [user, setUser] = useState({ name: "", age: 0 });

// ผิด: แก้ไข Object เดิมโดยตรง
user.age = 20;

// ถูกต้อง: สร้าง Object ใหม่ด้วย spread operator
setUser({ ...user, age: 20 });`,
      },
      {
        type: 'text',
        title: 'อัปเดต State ชนิด Array',
        body: 'หลักการเดียวกัน การเพิ่ม ลบ หรือแก้ไขรายการต้องสร้าง Array ใหม่เสมอ ห้ามแก้ไข Array เดิมตรง ๆ',
      },
      {
        type: 'code',
        code: `const [items, setItems] = useState(["เว็บไซต์", "ฐานข้อมูล"]);

// เพิ่มรายการใหม่ต่อท้าย
setItems([...items, "Front-End"]);

// ลบรายการตามตำแหน่ง (index)
setItems(items.filter((_, i) => i !== 0));`,
      },
      {
        type: 'text',
        title: 'อัปเดตค่าโดยอิงจากค่าก่อนหน้า (Functional Update)',
        body: 'ถ้าต้องเปลี่ยนค่าต่อเนื่องกันเร็ว ๆ ให้ใช้รูปแบบฟังก์ชันแทนการอ้างอิงตัวแปร state ตรง ๆ จะได้ค่าล่าสุดที่ถูกต้องเสมอ',
      },
      {
        type: 'code',
        code: `// อาจได้ผลลัพธ์ไม่ตรงตามคาด หากเรียกซ้อนกันเร็ว ๆ
setCount(count + 1);

// ปลอดภัยกว่า: ใช้ค่าก่อนหน้า (prev) ที่ React ส่งให้
setCount((prev) => prev + 1);`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'สรุปสำคัญ',
        body: 'กฎทองของ React คือ “ห้ามแก้ไขค่าเดิมโดยตรง” ไม่ว่าจะเป็นตัวเลข ข้อความ Object หรือ Array ให้สร้างค่าใหม่แล้วส่งให้ setState เสมอ',
      },
    ],
  },
  {
    id: 'real-use',
    order: 5,
    title: 'การประยุกต์ใช้งานจริง',
    sections: [
      {
        type: 'text',
        body: 'บทนี้เอาความรู้จากบทที่ 3 และ 4 มาใช้ในสถานการณ์ที่ใกล้เคียงงานจริงมากขึ้น',
      },
      {
        type: 'text',
        title: 'สวิตช์เปิด/ปิดพร้อมสถานะบนหน้าจอ',
        body: 'สวิตช์ที่เปลี่ยนทั้งรูปลักษณ์ปุ่มและข้อความสถานะไปพร้อมกัน โดยอ้างอิงค่า state ตัวเดียวกัน สีของสวิตช์ ตำแหน่งปุ่มกลม และข้อความ “เปิดใช้งาน” เปลี่ยนพร้อมกันหมด ทั้งที่โค้ดอ้างอิงตัวแปรตัวเดียว นี่คือพลังของ State ที่ทำให้ทุกจุดสอดคล้องกันเสมอ',
      },
      {
        type: 'text',
        title: 'ช่องกรอกข้อความแบบแสดงผลทันที',
        body: 'รูปแบบนี้ใช้บ่อยในฟอร์มค้นหาแบบ real-time หรือช่องแสดงตัวอย่างข้อความก่อนบันทึก อาศัยหลักการเดียวกับ Controlled Input ในบทที่ 3',
      },
      {
        type: 'list',
        title: 'โจทย์ฝึกฝนต่อยอด',
        items: [
          'ลองสร้างแอปรายการสิ่งที่ต้องทำ (To-do list) ด้วย state ชนิด Array',
          'ลองสร้างฟอร์มลงทะเบียนหลายช่อง โดยเก็บไว้ใน state Object เดียว',
          'ลองสร้างแอปนับคะแนนเกม 2 ฝั่ง โดยใช้ useState มากกว่า 1 ตัวในไฟล์เดียวกัน',
        ],
      },
    ],
  },
  {
    id: 'pitfalls',
    order: 6,
    title: 'ข้อผิดพลาดที่พบบ่อยและวิธีแก้ไข',
    sections: [
      {
        type: 'text',
        title: 'การอัปเดต State แบบ Asynchronous',
        body: 'หลายคนสับสนเมื่อ console.log ค่า state ทันทีหลังเรียก setState แล้วยังได้ค่าเดิม สาเหตุคือ React ไม่เปลี่ยนค่า state ทันที แต่รวบรวมคำสั่งไว้แล้วอัปเดตพร้อมกันในรอบถัดไป',
      },
      {
        type: 'code',
        code: `setCount(count + 1);
console.log(count); // ยังคงเป็นค่าเดิม ไม่ใช่ค่าที่เพิ่งตั้งใหม่`,
      },
      {
        type: 'text',
        body: 'อยากรู้ค่าล่าสุดที่ถูกต้อง ให้อ่านจากตัวแปร state ในรอบการแสดงผลถัดไป หรือใช้ useEffect ซึ่งเป็นเรื่องระดับสูงขึ้นไป',
      },
      {
        type: 'text',
        title: 'ปัญหาค่าเก่าค้าง (Stale Closure)',
        body: 'เมื่อฟังก์ชันถูกสร้างขึ้นครั้งเดียวแล้วอ้างอิงค่า state เดิมซ้ำ ๆ อาจได้ค่าที่ไม่ใช่ค่าล่าสุด ทางแก้คือใช้ functional update ตามที่กล่าวไว้ในบทที่ 4',
      },
      {
        type: 'table',
        title: 'สรุปข้อผิดพลาดที่พบบ่อย',
        head: ['ข้อผิดพลาด', 'วิธีแก้ไข'],
        rows: [
          ['กำหนดค่าตัวแปร state ตรง ๆ เช่น count = 5', 'ต้องเรียกผ่านฟังก์ชัน setState เสมอ เช่น setCount(5)'],
          ['แก้ไข Object หรือ Array เดิมตรง ๆ', 'สร้างค่าใหม่ด้วย spread operator (...) ก่อนส่งให้ setState'],
          ['อ่านค่า state ทันทีหลัง setState แล้วได้ค่าเดิม', 'เข้าใจว่า React อัปเดตค่าในรอบถัดไป ไม่ใช่ทันที'],
          ['เรียก useState ในเงื่อนไขหรือในลูป', 'ย้ายการเรียก useState ไว้นอกเงื่อนไข ที่ระดับบนสุดของฟังก์ชันเสมอ'],
        ],
      },
    ],
  },
  {
    id: 'exercise',
    order: 7,
    title: 'แบบฝึกหัดและแบบทดสอบท้ายเล่ม',
    sections: [
      {
        type: 'list',
        title: 'แบบฝึกหัดปฏิบัติ',
        items: [
          'เขียนแอปนับจำนวนคลิก พร้อมปุ่มเพิ่มค่าทีละ 5 และปุ่มรีเซ็ตกลับเป็น 0',
          'เขียนแอปสวิตช์เปิด/ปิดไฟ พร้อมเปลี่ยนสีพื้นหลังหน้าจอตามสถานะ',
          'เขียนแอปช่องกรอกชื่อ-นามสกุล 2 ช่อง โดยเก็บค่าทั้งคู่ไว้ใน state Object เดียว',
          'เขียนแอปรายการซื้อของ (Array) ที่พิมพ์ชื่อสินค้าแล้วกดเพิ่มลงรายการได้',
        ],
      },
    ],
  },
]

export const ebookQuiz = [
  {
    id: 'eb-q1',
    prompt: 'useState ใช้สำหรับทำสิ่งใดใน React Component',
    choices: [
      'เชื่อมต่อฐานข้อมูล',
      'จัดเก็บและเปลี่ยนแปลงค่าที่ทำให้หน้าจออัปเดต',
      'ตกแต่งหน้าเว็บด้วย CSS',
      'ส่งข้อมูลไปยัง Server',
    ],
    answer: 1,
  },
  {
    id: 'eb-q2',
    prompt: 'ข้อใดคือวิธีเปลี่ยนค่า state ที่ถูกต้อง',
    choices: ['count = count + 1', 'count++', 'setCount(count + 1)', 'useState(count + 1)'],
    answer: 2,
  },
  {
    id: 'eb-q3',
    prompt: 'เพราะเหตุใดจึงห้ามแก้ไข Object หรือ Array ของ state โดยตรง',
    choices: [
      'เพราะ React จะไม่ตรวจพบการเปลี่ยนแปลงและไม่ re-render หน้าจอ',
      'เพราะ JavaScript ไม่อนุญาตให้แก้ไข Object',
      'เพราะทำให้โปรแกรมทำงานช้าลงเสมอ',
      'ไม่มีข้อห้ามใด ๆ สามารถทำได้ตามปกติ',
    ],
    answer: 0,
  },
]
