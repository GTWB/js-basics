# JavaScript Basics

This repository contains a series of JavaScript exercises covering fundamental concepts such as:

- Variables and Functions
- Arrays and Objects
- map(), filter(), reduce()
- async/await and Promises

Each folder contains individual exercises with commented code.

# 01 – Variables & Functions

Small exercises demonstrating variables, functions (regular & arrow), template strings,
input validation, and simple operations.

# 02 – Arrays

Exercises covering creation, manipulation and iteration of arrays in JavaScript.

# 03 – Objects

Exercises covering object creation, property manipulation, and object methods in JavaScript.

# 04 – Array Methods

Exercises covering the use of forEach, map, filter, and reduce in JavaScript.
Each block demonstrates data transformation patterns relevant for QA automation (e.g., parsing API responses and computing summaries).

## Topics

- forEach: iteration without return
- map: transformation, returns new array
- filter: conditional selection
- reduce: aggregation

# 05 – Asynchronous JavaScript

This module focuses on mastering asynchronous programming in JavaScript — a fundamental skill for QA and Automation Engineers.  
It demonstrates how to manage asynchronous flows using Promises, async/await, and concurrency tools such as Promise.all() and Promise.race().

## Learning Topics

- Understand the asynchronous nature of JavaScript.
- Create and handle Promises for managing async logic.
- Write cleaner asynchronous code using async/await.
- Implement proper error handling using `.catch()` and `try...catch`.
- Execute multiple asynchronous operations in parallel using `Promise.all()` and `Promise.race()`.
- Apply these concepts to real-world QA workflows (API calls, test pipelines, data fetching).

# 06 – API & JSON Manipulation

This module covers how to interact with external APIs, handle HTTP responses, parse JSON data, and transform it for QA testing workflows.  
It builds upon asynchronous programming concepts and focuses on practical use cases for data validation and automation testing.

## Learning Topics

- Perform GET and POST requests using the `fetch()` API.
- Parse and transform JSON responses using `map()`, `filter()`, and `reduce()`.
- Handle HTTP and network errors with `try...catch` and conditional checks (`response.ok`).
- Run multiple API requests concurrently using `Promise.all()` and `Promise.allSettled()`.
- Integrate data processing patterns relevant for QA automation (e.g., validating API data consistency or computing test statistics).

## Exercises

1. **Basic Fetch Request**  
   Fetch user data from an API and log key fields (name, email, city).

2. **Filtering and Transformation**  
   Apply array methods to transform and filter JSON data (e.g., uppercase names, location-based filters).

3. **POST Request Simulation**  
   Send data to an API endpoint using POST with custom headers and log server responses.

4. **Error Handling**  
   Distinguish between HTTP and network errors, implementing clear error messages and fallbacks.

5. **Parallel API Calls**  
   Fetch multiple endpoints simultaneously using `Promise.all()` and `Promise.allSettled()`, then merge the results for analysis.

## Run

Go inside the folder and type the following command on the terminal:
node file-name.js
