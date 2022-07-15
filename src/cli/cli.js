#!/usr/bin/env node
const { mdLinks } = require("../index.js");

const cli = () => {
  const options = {
    validate: process.argv.includes("--validate") ? true : false,
    stats: process.argv.includes("--stats") ? true : false,
  };
  // console.log("argv antes", process.argv);
  //Se realiza el slice para tomar el parametro que escribo en la CLI, porque process.argv toma default el valor 0 y 1
  const argv = process.argv.slice(2);
  // console.log("argv despues slice", argv);

  mdLinks(argv[0], options).then((resp) => {
    console.log("mdLinks:", resp);
  });
};

cli();
