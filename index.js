const express = require("express");
const app = express();
// const critical = require("critical");
// const prpl = require("prpl-server");

// Serve static files from the main build directory
app.use(express.static(__dirname + "/build/default"));

app.get("*", function(req, res) {
  res.sendFile("index.html", { root: "." });
});

// Tell the app to listen for requests on port 3000
app.listen(3000, function() {
  console.info("Example app listening on port 3000!");
});

// app.get(
//   "/*",
//   prpl.makeHandler(".", {
//     builds: [
//       { name: "modern", browserCapabilities: ["es2015", "push"] },
//       { name: "fallback" }
//     ]
//   })
// );

// critical.generate({
//   // เป็นการบอก critical ว่าหลังจากแกะ critical CSS ออกมาแล้ว
//   // ให้นำก้อน CSS ที่ได้ไปแปะลง <style>...</style>
//   // ในส่วน head หรือที่เราเรียกกันว่า inline style
//   inline: true,
//   src: "index.html",
//   css: ["main.css"],
//   // ต้องการให้ผลลัพธ์ที่ได้อยู่ในไฟล์ไหน
//   dest: "index-critical.html",
//   // Viewport หรือขนาดของบราวเซอร์ที่ใช้
//   width: 1600,
//   height: 900,
//   // ลดขนาดไฟล์ด้วยการทำ minify
//   minify: true,
//   // อย่างที่กล่าวข้างต้น font-face ไม่ควรเป็น critical CSS
//   ignore: ["font-face"]
// });
