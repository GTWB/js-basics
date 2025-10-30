"use strict";

// ASYNC JAVASCRIPT
//PROMISES EXERCISES

/* 
1.	Create a function simulateDownload(file) that logs:
    Starting download: file.txt
    Download complete: file.txt

    but with a 2-second delay between them.

2.	Extend it so the function returns a Promise that resolves with:
"Download successful: file.txt" after 2 seconds


3.	Test the function using .then() and .catch().
*/
const simulateDownload = function (file) {
  //1. Creating function
  //
  return new Promise((resolve, err) => {
    //2. Returning a Promise
    const fileTxt = "file.txt";
    console.log(`Starting download: ${file}`);

    setTimeout(() => {
      file === fileTxt
        ? resolve(`Download successful: ${file}`)
        : err(`Download Failed. The parameter must be: ${fileTxt}`);
    }, 2000);
  });
};

console.log("Exercise 1:");

simulateDownload("file.txt") //3. Test the function using .then() and .catch()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

/* 
Simulate a small QA automation pipeline:

function fetchTestData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Test A", "Test B", "Test C"]);
    }, 1500);
  });
}

function runTests(tests) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = tests.map(test => ({
        name: test,
        status: Math.random() > 0.2 ? "passed" : "failed"
      }));
      resolve(results);
    }, 2000);
  });
}

1.	Use .then() chaining to:
	•	Fetch test data
	•	Run the tests
	•	Print the results (array of {name, status})
2.	Then refactor the same flow using async/await.
3.	Add error handling using try...catch and Promise.reject() (simulate a failed API call if tests array is empty).

*/

function fetchTestData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Test A", "Test B", "Test C"]);
    }, 2000);
  });
}

function runTests(tests) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = tests.map((test) => ({
        name: test,
        status: Math.random() > 0.2 ? "passed" : "failed",
      }));

      results.length > 0
        ? resolve(results)
        : reject(`No data found: ${results.length}`);
    }, 2500);
  });
}

setTimeout(() => console.log("Exercise 2:"), 2000);

fetchTestData() // Fetching data
  .then((res) => {
    return res;
  })
  .then((res) => {
    return runTests(res); //Run the test
  })
  .then((res) => {
    console.log(res); // Print the result
  })
  .catch((err) => console.log(err));

// Refactoring the same flow using async/await
