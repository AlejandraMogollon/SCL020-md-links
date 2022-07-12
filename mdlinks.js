// module.exports = () => {
//   // ...
// };

//---- Aqui exportamos las funciones, objetos, array ----
// module.exports = { };

const { mdLinks } = require("./src/cli/cli.js");

const options = {
  validate: process.argv.includes("--validate") ? true : false,
  stats: process.argv.includes("--stats") ? true : false,
};

const argv = process.argv.slice(2);

mdLinks(argv[0], options).then((resp) => {
  console.log("mdLinks:", resp);
});
