/* 1: Basic Fetch Request

Goal: Make a simple API call and extract data.
1.	Fetch data from
    https://jsonplaceholder.typicode.com/users
2.	Log:
	•	Each user’s name
	•	Their email
	•	Their city (address.city)
3.	Handle errors with try...catch.

Expected output:
    Leanne Graham | Sincere@april.biz | Gwenborough
    Ervin Howell | Shanna@melissa.tv | Wisokyburgh
    ... */

//FETCH REQUEST USING PROMISE SYNTAX (THEN/CATCH)
const fetchDataPromiseSyntax = function (url) {
  return fetch(url) //Fetching data
    .then((response) => {
      if (!response.ok) throw new Error(`Request Error: ${response.status}`);
      return response.json(); // Convert body response to JS object
    })
    .then((bodyData) => {
      const userData = bodyData.map(
        (objUser) =>
          `${objUser.name} | ${objUser.email} | ${objUser["address"].city}` // Extracting data
      );
      return userData;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

fetchDataPromiseSyntax("https://jsonplaceholder.typicode.com/users").then(
  (user) => {
    console.log("Promise Syntax: ");

    user.forEach((user) => console.log(user));
  }
);

//FETCH REQUEST USING ASYNC/AWAIT SYNTAX

const fetchDataAsyncAwait = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error request: ${response.status}`);
    const data = await response.json(); // Convert response into JS Object
    const userData = data.map(
      (objUser) =>
        `${objUser.name} | ${objUser.email} | ${objUser["address"]["city"]}`
    );
    return userData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

fetchDataAsyncAwait("https://jsonplaceholder.typicode.com/users").then(
  (user) => {
    console.log("Async/Await Syntax:");
    user.forEach((user) => console.log(user));
  }
);

/* 
2: Filtering and Transformation

Goal: Work with array methods to manipulate JSON.

Using the same dataset:
1.	Create a new array of names in uppercase.
2.	Filter users who live in "South Christy".
3.	Return the user who lives in South Christy
*/

const filtering = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Wrong request:" + response.status);

    const data = await response.json(); //Convert the body response into json format
    const result = data
      .filter((users) => users["address"]["city"] === "South Christy")
      .map((user) => {
        return { name: user.name.toUpperCase(), email: user.email };
      });

    return result;
  } catch (error) {
    console.error(error);
  }
};

filtering("https://jsonplaceholder.typicode.com/users").then((res) =>
  console.log(res)
);

/* 
3: POST Request Simulation

Goal: Send data to an API endpoint.
1.	Use endpoint:
    https://jsonplaceholder.typicode.com/posts
2.	Send a POST request with:
    {
  title: "QA Automation Project",
  body: "Testing API integration with fetch()",
  userId: 1
    }
3. use headers: 
    {
  "Content-Type": "application/json"
    }

4.	Log:
	•	Response status
	•	The JSON object returned from the server
*/

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },

  body: JSON.stringify({
    title: "QA Automation project",
    body: "Testing API integration with fetch()",
    userId: 1,
  }),
})
  .then((res) => {
    if (!res.ok) throw new Error("Wrong request: " + res.status);
    console.log(`Server response status: ${res.status}`);
    //console.log(res.headers.get("content-type"));
    return res.json();
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

//Using async/await syntax

//Creating a request
const request = new Request("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    title: "QA Automation project",
    body: { name: "john", lastName: "mcDonald", city: "London" },
    userId: 2,
  }),
});

async function postRequest(request) {
  try {
    const response = await fetch(request); //Using the request into fetch
    if (!response.ok) throw new Error(`Wrong request: ${response.status}`);
    console.log(`Server response status: ${response.status}`);
    const data = await response.json(); //Converting response into JS Object
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

postRequest(request);

/* 
4: Error Handling

Goal: Distinguish between HTTP errors and network errors.
1.	Make a request to a wrong endpoint (/invalid-url).
2.	Catch HTTP 404 and log:
❌ Error 404: Resource not found
3.	Simulate offline mode (turn off internet or use an invalid domain) →
Catch and log:
  ⚠️ Network error: Unable to reach server
*/

const wrongRequest = async function (url) {
  try {
    const response = await fetch(url);

    if (!response.ok)
      throw new Error(`Error ${response.status}: Resource not found`);
  } catch (error) {
    error.name === "TypeError"
      ? console.error(`⚠️ Network error: Unable to reach server.`)
      : console.error(error.message);
  }
};

wrongRequest("https://jsonplaceholder.typicode.com/pots");

/* 
5: Parallel API Calls

Goal: Run multiple requests at once using Promise.all.
1.	Fetch:
	•	Users → https://jsonplaceholder.typicode.com/users
	•	Posts → https://jsonplaceholder.typicode.com/posts
2.	Wait for both using:
  const [users, posts] = await Promise.all([fetch(...), fetch(...)]);
3. Log:
  ✅ Data loaded: 10 users and 100 posts
4. Compute how many posts each user wrote:
  [{ user: "Leanne Graham", posts: 10 }, ...]
*/

const parallelApiCalls = async function (...urls) {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch(urls[0]),
      fetch(urls[1]),
    ]); //Making 2 requests and getting the response using Promise.all()

    if (!usersResponse.ok || !postsResponse.ok)
      throw new Error(
        `Wrong request: ${usersResponse.status}, ${postsResponse.status}`
      );

    return Promise.all([usersResponse.json(), postsResponse.json()]); // return all the response and convert them into JS Object
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Promise Rejected");
    } else {
      console.error(error.message);
    }
  }
};

parallelApiCalls(
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts"
)
  .then((res) => {
    //Getting data as a JS object

    console.log(`✅ Data loaded: ${res[0].length} users and ${res[1].length}`);

    const userPostsNumberObj = res[0].map((user) => {
      //New array calculating how many posts each user wrote
      const posts = res[1].filter((posts) => {
        return posts.userId === user.id;
      });
      return { user: user.name, posts: posts.length };
    });
    return userPostsNumberObj;
  })
  .then((res) => console.log(res));

// Write an async function getCompletedTodos() that:
// 	1.	Fetches todos from:
// https://jsonplaceholder.typicode.com/todos
// 	2.	Filters only the completed ones.
// 	3.	Returns an array containing only their titles.
// 	4.	Handles both network and HTTP errors gracefully.

// Expected output (first few):

// ✅ Completed Todos:
// [
//   "delectus aut autem",
//   "quis ut nam facilis et officia qui",
//   ...
// ]

const getCompletedTodos = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();

    const completeDataFiltered = data.filter(
      (data) => data["completed"] === true
    );
    const completedTodos = completeDataFiltered.map((data) => {
      return data.title;
    });

    console.log("✅ Completed Todos:");
    console.log(completedTodos);

    return completedTodos;
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("⚠️ Network error: unable to reach server");
      return [];
    }
    console.error(error.message);
    return [];
  }
};

getCompletedTodos("https://jsonplaceholder.typicode.com/todos");

// Write an async function getUserPostSummary() that:
// 	1.	Fetches users and posts in parallel using Promise.all().
// 	2.	Logs how many posts each user wrote.
// 	3.	Returns an array like:

//   [
//   { user: "Leanne Graham", posts: 10 },
//   { user: "Ervin Howell", posts: 10 },
//   ...
// ]

// 	4.	If one of the two API calls fails, the function should still return whatever data it managed to retrieve,
// and log a warning for the failed request.

const getUserPostSummary = async function (...urls) {
  try {
    const [usersResponse, postsResponse] = await Promise.allSettled([
      fetch(urls[0]),
      fetch(urls[1]),
    ]); //Making 2 requests and getting the response using Promise.all()

    let users = [];
    let posts = [];

    // USERS
    if (usersResponse.status === "fulfilled") {
      if (usersResponse.value.ok) {
        users = await usersResponse.value.json();
      } else {
        console.warn(
          `⚠️ Users HTTP ${usersResponse.value.status} — proceeding without users`
        );
      }
    } else {
      console.warn(`⚠️ Users request failed: ${usersResponse.reason}`);
    }

    // POSTS

    if (postsResponse.status === "fulfilled") {
      if (postsResponse.value.ok) {
        posts = await postsResponse.value.json();
      } else {
        console.warn(
          `⚠️ Posts HTTP ${postsResponse.value.status} — proceeding without posts`
        );
      }
    } else {
      console.warn(`⚠️ Posts request failed: ${postsResponse.reason}`);
    }

    console.log(
      `✅ Data loaded: ${users.length} users and ${posts.length} posts`
    );

    const userPostsCount = users.map((user) => {
      const postsObj = posts.filter((post) => post.userId === user.id);

      return { user: user.name, posts: postsObj.length };
    });
    console.log(userPostsCount);
    return userPostsCount;
  } catch (error) {
    // This catch is mostly for unexpected runtime errors
    console.error("Unexpected error:", error);
    return [];
  }
};

getUserPostSummary(
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/psts"
);
