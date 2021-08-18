const john = {
  name: "John",
  surname: "Doe",
  age: 30,
  hobbies: ["Surf", "Design"],
};

const createNewImmutableObj = (obj, newObjDetails) => ({
  ...obj,
  ...newObjDetails,
});

const jane = createNewImmutableObj(john, {
  name: "Jane",
  hobbies: [...john.hobbies, "MuayThai", "Programming"],
});

console.log("John:", john);
console.log("Jane:", jane);

//
// Segunda possível solução
//

// const jane = {
//   ...john,
//   name: "Jane",
//   hobbies: [...john.hobbies, "MuayThai", "Programming"],
// };

// console.log("John:", john);
// console.log("Jane:", jane);

