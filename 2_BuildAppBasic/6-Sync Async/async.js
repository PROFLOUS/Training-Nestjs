const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./store/local.txt");

fs.readFile(filePath, "utf8", (error, data) => {
  if (error) return console.error(error); // 
  console.log(data); 
});
