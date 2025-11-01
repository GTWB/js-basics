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
    .catch((err) => console.error(err));
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
    const data = await response.json();
    const userData = data.map(
      (objUser) =>
        `${objUser.name} | ${objUser.email} | ${objUser["address"]["city"]}`
    );
    return userData;
  } catch (error) {
    console.error(error);
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
  headers: { "Content-Type": "application/json" },

  body: JSON.stringify({
    title: "QA Automation project",
    body: "Testing API integration with fetch()",
    userId: 1,
  }),
})
  .then((res) => {
    console.log(res);
    if (!res.ok) throw new Error("Wrong request: " + res.status);
    console.log(`Server response status: ${res.status}`);

    return res.json();
  })
  .then((res) => console.log(res));
