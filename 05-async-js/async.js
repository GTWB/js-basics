"use strict";

// ASYNC JAVASCRIPT
//PROMISES EXERCISES

//1. Simulated File Download
//Goal: Practice creating and resolving Promises.
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
  return new Promise((resolve, reject) => {
    //2. Returning a Promise
    const required = "file.txt";
    console.log(`Starting download: ${file}`);

    setTimeout(() => {
      if (file === required) {
        console.log(`Download complete: ${file}`);
        resolve(`Download successful: ${file}`);
      } else reject(`Download Failed. The parameter must be: ${required}`);
    }, 2000);
  });
};

simulateDownload("file.txt") //3. Test the function using .then() and .catch()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//2. Simulate a small QA automation pipeline:
// Goal: Chain multiple async functions using Promises and async/await.
/* 
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

fetchTestData() // Fetching data
  .then((res) => {
    return res;
  })
  .then((res) => {
    return runTests(res); //Run the test
  })
  .then(console.log)
  .catch((err) => console.log(err));

runTests([]).catch((err) => console.error(`Simulation of failure: ${err}`));

// Refactoring the same flow using async/await
async function testsResult() {
  try {
    const result = await fetchTestData();
    console.log(result);
    const getData = await runTests(result);
    console.log(getData);
  } catch (err) {
    console.error(err);
  }
}

testsResult();

//3. Parallel Promises
//Goal: Execute asynchronous tasks concurrently.
/* 
1.	Create two functions:
	•	getUserData() → resolves after 2s
	•	getPosts() → resolves after 3s
2.	Use Promise.all() to run both in parallel and log:
  All data loaded
*/

const getUserData = function () {
  return new Promise((resolve) => {
    setTimeout(() => resolve("getUserData resolved"), 2000);
  });
};

const getPosts = function () {
  return new Promise((resolve) => {
    setTimeout(() => resolve("getPosts resolved"), 3000);
  });
};

Promise.all([getUserData(), getPosts()]).then((res) => {
  console.log(`All data loaded: ${res}`);
});

//4. Create Promise fetching web test API using HttpRequest
//Goal: Wrap API calls inside Promises and handle responses properly.
const getWebApi = function (url) {
  return new Promise((resolve, reject) => {
    const httpReq = new XMLHttpRequest();
    httpReq.open("GET", url);
    httpReq.send();

    httpReq.onload = function () {
      if (httpReq.status === 200) {
        resolve(JSON.parse(httpReq.responseText));
      } else reject(`Bad Request: ${httpReq.status}`);
    };
  });
};

getWebApi("https://jsonplaceholder.typicode.com/posts")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err));

//Create a function fetching web data using fetch()

const getwebData = function (url) {
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.error(err.message));
};

getwebData("https://jsonplaceholder.typicode.com/posts");

//5. Simulated API chain
// Goal: Combine dependent async calls.
/* 
1.	Write the .then() chain version that:
	•	Fetches the user
	•	Fetches their orders
	•	Logs both results
	•	Catches and logs any errors
2.	Refactor the same logic using async/await inside a try...catch block.

*/

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: id, name: "Giuseppe" }), 1000);
  });
}

function fetchOrders(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orders = userId === 1 ? ["Order A", "Order B"] : [];
      if (orders.length === 0) reject("No orders found");
      else resolve(orders);
    }, 1500);
  });
}

fetchUser(1)
  .then((res) => {
    console.log(res);
    return res;
  })
  .then((res) => {
    return fetchOrders(res.id);
  })
  .then((res) => console.log(res))
  .catch((err) => {
    console.error(err);
  });

fetchUser(2)
  .then((user) => fetchOrders(user.id))
  .then(console.log)
  .catch((err) => console.error("Simulated error:", err)); //Simulating error

// Refactor the same logic using async/await inside a try...catch block.

async function getOrdersData() {
  try {
    const result = await fetchUser(1);
    console.log(result);
    const order = await fetchOrders(result.id);
    console.log(order);
  } catch (error) {
    console.error(`No data found: ${error}`);
  }
}

const failureSimulation = async function () {
  //Simulation error
  try {
    const user = await fetchUser(2);
    const orders = await fetchOrders(user.id);
    console.log(orders);
  } catch (error) {
    console.error(`No data simulation: ${error}`);
  }
};

getOrdersData();
failureSimulation();

//6. Parallel Promise & Error Race
//Goal: Understand the difference between executing all Promises vs. returning the first settled one.
/* 
Write a script that:
1.	Creates two functions:
  const task1 = () => new Promise(res => setTimeout(() => res("Task 1 done"), 2000));
  const task2 = () => new Promise((_, rej) => setTimeout(() => rej("Task 2 failed"), 1000));

2.	Run both functions using:
	•	Promise.all() and log what happens.
	•	Promise.race() and log which result you get first.

*/

const task1 = () =>
  new Promise((res) => setTimeout(() => res("Task 1 done"), 500));
const task2 = () =>
  new Promise((_, rej) => setTimeout(() => rej("Task 2 failed"), 1000));

Promise.all([task1(), task2()])
  .then((values) => {
    console.log(`All Resolved ${values}`);
  })
  .catch((err) => console.error(`All Rejected ${err}`));

Promise.race([task1(), task2()])
  .then((values) => {
    console.log(`Race resolved first: ${values}`);
  })
  .catch((err) => console.error(`Race rejected: ${err}`));
