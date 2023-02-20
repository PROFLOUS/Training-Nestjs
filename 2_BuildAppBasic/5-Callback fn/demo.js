// let order = (fruitName, callback) => {
//     console.log(`I want to order ${fruitName}`);
//     callback();
// };

// let production = () => {
//     console.log('Production has started');
// };

// order("Apple", production);

// Callback hell

let order = (fruitName, callback) => {
  console.log(`I want to order ${fruitName}`);
  callback();
};

let production = () => {
  setTimeout(() => {
    console.log("Production has started");
    setTimeout(() => {
      console.log("Production has finished");
      setTimeout(() => {
        console.log("The product has been delivered");
      }, 2000);
    }, 2000);
  }, 3000);
};

order("Apple", production);
