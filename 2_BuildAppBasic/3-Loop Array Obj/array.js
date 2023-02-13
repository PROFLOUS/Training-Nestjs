var array = [1, 2, 3, 4, 5];

for (var i = 0; i < array.length; i++) {
    console.log("for",array[i]);
}

for (let value of array) {
    console.log("for of",value);
}

// for in
for (let key in array) {
    console.log("for in",key);
}

array.forEach(function(value, index) {
    console.log("foreach",value, index);
});

while(array.length) {
    console.log("while",array.pop());
}

do {
    console.log("do while",array.pop());
} while(array.length);