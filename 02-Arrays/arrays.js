"use strict";

//WARM-UP
// 	1.	Create an array friends with 3 names.
const array = ["friend1", "friend2", "friend3"];

// 	2.	Print the first and last friend using indexes.
console.log(array[0], array[array.length - 1]);

// 	3.	Add a new friend at the end using .push(), and one at the beginning using .unshift().
array.push("friend4");
array.unshift("friend5");

console.log(array);

// 	4.	Remove the last friend using .pop() and print the removed value.
array.pop();
console.log(array);

// CORE TASK

const ages = [22, 25, 29, 34, 42, 18];

const calcAverageArr = function (arr) {
  let acc = 0;
  for (let i = 0; i < arr.length; i++) {
    acc = acc + arr[i];
  }
  const average = acc / arr.length;

  return `The average age is ${average.toFixed(1)}`;
};

console.log(calcAverageArr(ages));

//Stretch Goal
const italianFoods = ["Pizza", "Pasta", "Lasagna"];
const ukFoods = ["Fish & Chips", "Sunday Roast"];

const favouriteFood = [...italianFoods, ...ukFoods]; // Merge the 2 arrays using spread operator

favouriteFood.pop(); // Removing the last element

console.log(favouriteFood);
