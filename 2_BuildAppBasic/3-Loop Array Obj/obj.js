// for obj
var obj = {
    name: 'John',
    age: 30,
    city: 'New York',
    getName: function() {
        return this.name;
    }
}

console.log(Object.entries(obj));




// for in
for (let key in obj) {
    console.log(key);
}

// for of
for (let value of Object.entries(obj)) {
    console.log(value);
}




