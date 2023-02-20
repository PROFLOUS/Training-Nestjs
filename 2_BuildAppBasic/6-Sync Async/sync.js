const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./store/local.txt");

try {
  const data = fs.readFileSync(filePath, "utf8");
  console.log(data);
} catch (error) {
  console.error(error);
}
