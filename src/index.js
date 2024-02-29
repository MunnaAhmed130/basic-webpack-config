// import { camelCase } from "lodash";
// above code does not do tree-shaking

// import camelCase from "lodash/camelCase";

import { camelCase } from "lodash-es";

import string from "./app";
import "./style.scss";

console.log(string);

const info = {
  job: "dev",
  experience: 4,
};

const person = {
  name: "John",
  country: "Bangladesh",
  ...info,
};

console.log("ES7", person);
console.log("ES8", Object.values(person));

console.log(camelCase("Hello World!"));
