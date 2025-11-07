// Task A – Test Data Cleaner

// Create a function called cleanUserData() that:
// 	1.	Takes as input an array of user objects (fetched from any API).
// 	2.	Returns a new array with:
// 	•	Only users that have a valid email (contains “@”).
// 	•	Names formatted to uppercase.
// 	•	A new key isActive: true for each valid user.
// 	3.	Ensure the original array is not modified.

// Example input:

// [
//   { name: "giuseppe", email: "giuseppe@qa.com" },
//   { name: "luca", email: "invalidemail" },
// ]

// Expected output:

// [
//   { name: "giuseppe", email: "giuseppe@qa.com" },
//   { name: "luca", email: "invalidemail" },
// ]

//Fetching data from WEB API
const fetchData = function (url) {
  return fetch(url) //Request Data from API
    .then((response) => {
      if (!response.ok) throw new Error(`Error:${response.status}`);
      return response.json(); //Converting body response into JS Obj
    })
    .catch((err) => {
      //Error Handling
      console.error(err.message);
      return [];
    });
};

fetchData("https://jsonplaceholder.typicode.com/users");

const cleanUserData = function (data) {
  return data //Return JS object from API
    .then((userData) => {
      if (userData.length === 0)
        // If no data Throw an error
        throw new Error(`No data Found: ${userData.length}`);
      console.log(`${userData.length} data found:`);
      return userData.map((user) => {
        // loop through the data and return a new array with a new obj inside
        let active = false;
        if (user.email.includes("@")) {
          active = true;
        }

        console.log(`${user.name}, ${user.email}, ${active}`);
        return {
          name: user.name.toUpperCase(),
          email: user.email,
          isActive: active,
        };
      });
    })
    .catch((err) => console.error(err.message)); //Handling error
};

// Task B – QA Report Generator

// Write an async function called generateQAReport() that:
// 	1.	Fetches data from two endpoints:
// 	•	https://jsonplaceholder.typicode.com/users
// 	•	https://jsonplaceholder.typicode.com/todos
// 	2.	Uses Promise.all() to load both concurrently.
// 	3.	Builds a report array where each object has:

//     { user: "Leanne Graham", completedTodos: 8, pendingTodos: 2 }

//     4.	Handle any error gracefully (log a warning and continue).
// 	5.	Log the summary to the console.

const generateQAReport = async function (url1, url2) {
  try {
    const [responseUser, responseTodos] = await Promise.allSettled([
      fetch(url1),
      fetch(url2),
    ]);

    let userData = [];
    let todosData = [];

    if (responseUser.status === "fulfilled") {
      if (responseUser.value.ok) {
        userData = await responseUser.value.json();
      } else {
        console.warn(`No data: ${userData.length}`);
      }
    }

    if (responseTodos.status === "fulfilled") {
      if (responseTodos.value.ok) {
        todosData = await responseTodos.value.json();
      } else {
        console.warn(`No Todos data: ${todosData.length}`);
      }
    }

    return userData.map((user) => {
      const todos = todosData.filter((todos) => {
        return todos.userId === user.id;
      });
      const completed = todos.filter((todos) => todos.completed === true);
      const pending = todos.filter((todos) => todos.completed === false);

      return {
        user: user.name,
        completedTodos: completed.length,
        pendingTodos: pending.length,
      };
    });
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

// Task C – Test Result Aggregator (Bonus)

// Write a small script that:
// 1.	Has an array of test results:

// [
//   { name: "Login test", status: "passed" },
//   { name: "Signup test", status: "failed" },
//   { name: "Profile update", status: "passed" }
// ]

// 	2.	Using reduce(), compute an object like:

//   { passed: 2, failed: 1, total: 3 }

// 	3.	Log the summary as:

//   ✅ Passed: 2 | ❌ Failed: 1 | Total: 3

const testResult = [
  { name: "Login test", status: "passed" },
  { name: "Signup test", status: "failed" },
  { name: "Profile update", status: "passed" },
];

const summary = testResult.reduce(
  (acc, obj, i) => {
    if (obj.status === "passed") acc.passed += 1;

    if (obj.status === "failed") acc.failed += 1;
    acc.total = i + 1;

    return acc;
  },
  { passed: 0, failed: 0, total: 0 }
);

console.log(
  ` ✅ Passed: ${summary.passed} | ❌ Failed: ${summary.failed} | Total: ${summary.total}`
);
