"use strict";

//Regular Function

function calcYearsUntilRetirement(birthYear) {
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthYear;

  const yearsRemaining = 65 - currentAge;
  if (currentAge >= 65) {
    return "Already Retired";
  } else {
    return yearsRemaining;
  }
}

console.log(calcYearsUntilRetirement(1990));

//Arrow Function
const calcYearsUntilRetirement2 = (birthYear) => {
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthYear;

  const yearsRemaining = currentAge >= 65 ? "Already Retired" : 65 - currentAge;

  return yearsRemaining;
};

console.log(calcYearsUntilRetirement2(1999));

const describeJob = (job, name) => `${name} is a ${job}`;

console.log(describeJob("QA Engineer", "Giuseppe"));

const math = function (a, b) {
  return {
    sum: a + b,
    difference: a - b,
    product: a * b,
    quotient: b === 0 ? null : a / b,
  };
};

console.log(math(8, 2));
