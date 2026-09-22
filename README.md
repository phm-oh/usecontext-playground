# Context Lab

ชุดสื่อการเรียนออนไลน์เรื่อง React `useContext` สำหรับนักเรียน ปวส. สาขาเทคโนโลยีสารสนเทศ  
ใช้ประเมินผลก่อน–หลังเรียน และฝึกปฏิบัติใน Playground แบบ frontend-only

## วงจรการเรียน

1. ลงทะเบียนชื่อและรหัสนักศึกษา
2. แบบทดสอบก่อนเรียน 10 ข้อ
3. บทเรียน 6 บท พร้อมตรวจท้ายบท
4. Playground: ต้นไม้ข้อมูล, ธีม, สิทธิ์ผู้ใช้, ตะกร้า, โจทย์แล็บ
5. แบบทดสอบหลังเรียน 10 ข้อ
6. หน้าคะแนนเปรียบเทียบ พิมพ์หรือบันทึกเป็น PDF ได้

ข้อมูลทั้งหมดเก็บใน `localStorage` ของเบราว์เซอร์นักเรียน

## รันบนเครื่อง

```bash
npm install
npm run dev
```

## สร้างไฟล์ขึ้นโฮสต์

```bash
npm run build
```

## Deploy บน Cloudflare

โปรเจกต์ตั้งค่าแบบ React SPA + Cloudflare Vite plugin แล้ว

```bash
npx wrangler login
npm run deploy
```

หรือผูก Git แล้วใช้ Cloudflare Workers/Pages โดยกำหนด

- Build command: `npm run build`
- ถ้าใช้ Pages แบบอัปโหลดโฟลเดอร์ ให้ชี้ไปที่ผลลัพธ์ที่ Vite สร้างหลัง build

SPA fallback เปิดด้วย `not_found_handling: single-page-application` ใน `wrangler.jsonc`
