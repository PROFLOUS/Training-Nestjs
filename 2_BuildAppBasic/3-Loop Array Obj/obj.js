// for obj
var obj = {
  name: "John",
  age: 30,
  city: "New York",
  getName: function () {
    return this.name;
  },
};

console.log("convert arr", Object.entries(obj));

// for in
for (let key in obj) {
  console.log("for in", key);
}

// for of
for (let value of Object.entries(obj)) {
  console.log("for of", value);
}
