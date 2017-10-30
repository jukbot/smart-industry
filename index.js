// app.get("/api/launch", (req, res, next) => res.send("boom"));

// app.get(
//   "/*",
//   prpl.makeHandler(".", {
//     builds: [
//       { name: "modern", browserCapabilities: ["es2015", "push"] },
//       { name: "fallback" }
//     ]
//   })
// );

// app.listen(8080);

// IN TESTING OF PRPL SERVER NODE

const critical = require("critical");
const prpl = require("prpl-server");
const express = require("express");
const app = express();

critical.generate({
  // เป็นการบอก critical ว่าหลังจากแกะ critical CSS ออกมาแล้ว
  // ให้นำก้อน CSS ที่ได้ไปแปะลง <style>...</style>
  // ในส่วน head หรือที่เราเรียกกันว่า inline style
  inline: true,
  src: "index.html",
  css: ["main.css"],
  // ต้องการให้ผลลัพธ์ที่ได้อยู่ในไฟล์ไหน
  dest: "index-critical.html",
  // Viewport หรือขนาดของบราวเซอร์ที่ใช้
  width: 1600,
  height: 900,
  // ลดขนาดไฟล์ด้วยการทำ minify
  minify: true,
  // อย่างที่กล่าวข้างต้น font-face ไม่ควรเป็น critical CSS
  ignore: ["font-face"]
});
