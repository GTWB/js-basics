// Warm-up

const person = {
  firstName: "John",
  lastName: "Mayer",
  age: 40,
  job: "Musician/songwriter",
  city: "New York",
};

console.log(person.firstName); // Print proprerty value using dot notation
console.log(person["age"]); // Print property value using bracket notation

person["isMarried"] = true;
delete person["city"];

person["age"] = person["age"] + 1;

console.log(person);

//CORE TASK

const car = {
  brand: "Mini",
  model: "Cooper",
  year: 2023,
  color: "blue",
  getCarInfo() {
    return `This car is a ${this.color} ${this.year} ${this.brand} ${this.model}.`;
  },
  calcAge: function () {
    const currentYear = new Date().getFullYear();

    return currentYear - this.year;
  },
};

console.log(car.getCarInfo());
console.log(car["calcAge"]());

// STRETCH GOAL

const users = [
  { name: "josh", email: "josh@email.com", isActive: true },
  { name: "Manuel", email: "manuel@email.com", isActive: false },
  { name: "Turi", email: "turi@email.com", isActive: true },
]; // Creating array with 3 objects

for (const obj of users) {
  obj.isActive ? console.log(obj.name) : null; //Print only the names of active users
}

users.push({ name: "Alfredo", email: "alfredo@email.com", isActive: true }); //Adding new user

console.log(users); // Log the updated list with the new user
