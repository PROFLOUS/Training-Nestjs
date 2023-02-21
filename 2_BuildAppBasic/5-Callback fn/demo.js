
const sum=(a,b)=>a+b;

const mul=(a,b)=>a*b;

const div=(a,b)=>a/b;

const sub=(a,b)=>a-b;

const calc=(a,b,op)=>op(a,b);

console.log(calc(10,20,sum));