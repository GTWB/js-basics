// ForEach method
const fruits = ["apple", "banana", "orange"];
/* 
	•	Print each fruit in uppercase using forEach().
	•	Count how many characters each fruit has and log the message:
    apple → 5 characters
    banana → 6 characters
    orange → 6 characters
*/
fruits.forEach((fruit) => {
  console.log(`${fruit.toUpperCase()} -> ${fruit.length} characters`);
});

//map

const prices = [10, 20, 30, 40];
/* 
	•	Create a new array pricesWithTax where each price includes 10% tax.
	•	Round to 2 decimals
*/
const pricesWithTax = prices.map((price) => {
  return Number((price + (price * 10) / 100).toFixed(2));
});

console.log(pricesWithTax);

// Filter

const temperatures = [8, 22, 30, 15, 5, 25];

/* 
	•	Create a new array warmDays with temperatures ≥ 20.
	•	Log both arrays to confirm the original is unchanged.
*/

const warmDays = temperatures.filter((degrees) => degrees >= 20);
console.log(temperatures);
console.log(warmDays);

//Reduce

const numbers = [3, 7, 10, 15];

/* 
	•	Use reduce to calculate the total sum.
	•	Then use it again to find the maximum number.
*/

const totalSum = numbers.reduce((acc, currentNum) => {
  return acc + currentNum;
}, 0);

const maximumNumber = numbers.reduce((acc, currentNum) => {
  return currentNum > acc ? currentNum : acc;
}, numbers[0]);

console.log(maximumNumber);
console.log(totalSum);

//COMBINING METHODS

//MAP + FILTER

const transactions = [200, -100, 340, -300, 50, 400];

/* 
	•	Create a new array of positive transactions increased by 10%.
	•	Log the result.
    •   Expected: 
    [220, 374, 55, 440]
*/

const increasedDeposits = transactions
  .filter((transaction) => transaction > 0)
  .map((transaction) => transaction + (transaction * 10) / 100);

console.log(increasedDeposits);

//Summarising data

const sales = [120, 85, 250, 400, 310];

/* 
	•	keep only sales over 100.
	•	calculate the total of those sales.
	•	Log: Total sales over 100: 1080
*/

const salesOver100 = sales
  .filter((sale) => sale > 100)
  .reduce((acc, sale) => acc + sale, 0);

console.log(`Total sales over 100: ${salesOver100}`);

//Data extraction from objects

const users = [
  { name: "John", age: 28 },
  { name: "Maria", age: 34 },
  { name: "Tom", age: 19 },
];

/* 
	•	get an array of names.
	•	calculate the average age.
*/

const userNames = users.map((user) => user.name);
const averageAge = users.reduce((acc, u) => {
  return acc + u.age / users.length;
}, 0);
console.log(averageAge);
console.log(userNames);

/* 

Mock API Response: 

	1.	Filter all tests with status "passed".
	2.	Map to get only their durations.
	3.	Calculate the average duration of passed tests.

  Result: Average duration of passed tests: 4.73s

*/

const apiResponse = [
  { id: 1, status: "passed", duration: 4.3 },
  { id: 2, status: "failed", duration: 5.1 },
  { id: 3, status: "passed", duration: 3.7 },
  { id: 4, status: "passed", duration: 6.2 },
  { id: 5, status: "failed", duration: 2.8 },
];

const average = apiResponse
  .filter((res) => res.status === "passed")
  .map((res) => res.duration)
  .reduce((acc, duration, _, arr) => acc + duration / arr.length, 0)
  .toFixed(2);

console.log(`Average duration of passed tests: ${average}s`);

//A) NUMBERS PIPELINE
const number = [5, 12, 7, 9, 21, 4];

/* 
	1.	Use forEach to compute an object { sum, max } without using reduce.
	2.	Use map to return a new array of squares.
	3.	Use filter to return numbers ≥ 10.
	4.	Use reduce to compute the sum of numbers ≥ 10 without creating an intermediate array (i.e., do the condition inside the reducer).
*/

//1.
let object = {
  sum: 0,
  max: 0,
};

const e = number.forEach((element) => {
  object["sum"] = object.sum + element;
  if (object["max"] <= element) {
    object["max"] = element;
  }
});

console.log(object);

//2.
const squares = number.map((element) => Math.pow(element, 2));

console.log(squares);

//3.
const numberOverEqualTen = number.filter((element) => element >= 10);
console.log(numberOverEqualTen);

//4.
const total = number.reduce((acc, element) => {
  if (element >= 10) acc = acc + element;
  return acc;
}, 0);

console.log(total);

//B) TEST ANALYTICS
/* 
	1.	Using reduce, build a single summary object that counts each status:
  { passed: 0, failed: 0, skipped: 0 }
  2.	In the same reduce, also accumulate sumPassed and countPassed, then compute avgPassed after the reduce in O(1).
	3.	Using filter + map, produce failedIds (an array of the ids of failed tests).

✅ Expected checks:
	•	summary.passed = 2, failed = 2, skipped = 1
	•	avgPassed = 3.55
	•	failedIds = [102, 105]
*/
const tests = [
  { id: 101, status: "passed", duration: 2.1 },
  { id: 102, status: "failed", duration: 3.4 },
  { id: 103, status: "skipped", duration: 0.0 },
  { id: 104, status: "passed", duration: 5.0 },
  { id: 105, status: "failed", duration: 1.7 },
];

const summary = tests.reduce(
  // build summary object + accumulate sumPassed and countPassed
  (acc, test) => {
    acc[test.status] += 1; //Count status

    if (test.status === "passed") {
      // Accumulating sumPassed and countPassed
      acc.sumPassed += test.duration;
      acc.countPassed = acc.passed;
    }

    return acc;
  },
  {
    passed: 0,
    failed: 0,
    skipped: 0,
    sumPassed: 0,
    countPassed: 0,
  }
);

//Compute avgPassed
const avgPassed = summary.sumPassed / summary.countPassed;

console.log(summary);
console.log(avgPassed);

// Failed Ids

const failedIds = tests
  .filter((test) => test.status === "failed")
  .map((test) => test.id);

console.log(failedIds);

//C) EDGE-CASE DISCIPLINE

/* 
	1.	Write a single reduce that sums only finite numbers from:
  const mixed = [10, NaN, 5, Infinity, -3, "7", 2];
  Rules: treat only real numbers; ignore everything else (including numeric strings and infinities).

  2.	Explain in one line how your reducer avoids throwing on an empty array.
*/

const mixed = [10, NaN, 5, Infinity, -3, "7", 2];
console.log(typeof mixed[3]);

const realNumbers = mixed.reduce((acc, number) => {
  return Number.isFinite(number) ? acc + number : acc;
}, 0);

console.log(realNumbers);
