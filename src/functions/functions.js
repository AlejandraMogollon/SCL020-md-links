const path = require("path");
const { readdirSync } = require("fs");
const cheerio = require("cheerio");
const marked = require("marked");

let mdFiles = [];
const validatePath = (myPath) => {
  const allowExt = [".md"];
  if (
    !path.isAbsolute(myPath) &&
    !allowExt.includes(myPath.substring(myPath.length - 3))
  ) {
    return getFiles(path.resolve(myPath)); //path.resolve me devuelve toda la ruta completa desde lo que escribimos en el cli hasta final de la izq
  }
  mdFiles.push(myPath);
  return mdFiles;
};

const getFiles = (vPath) => {
  const files = readdirSync(vPath); // Aqui conseguimos todos los archivos que conseguimos en el path
  const allowExt = [".md"];
  files.forEach((element) => {
    try {
      if (!allowExt.includes(element.substring(element.length - 3))) {
        const pathResolved = path.resolve(vPath + "/" + element);
        return getFiles(pathResolved); //volvemos a utilizar la funcion getfiles para verificar si la ruta de cada iteracion tiene mas archivos
      }
      mdFiles.push(path.resolve(vPath + "/" + element));
    } catch (err) {
      // No lanzamos error para que continue buscando todos los archivos en las carpetas restantes.
      console.log("invalid path");
    }
  });
  return mdFiles;
};

const getLinkInfo = (markdown) => {
  const dataHtml = marked.parse(markdown);
  const $ = cheerio.load(dataHtml);
  const linksObjects = $("a");

  const linksInfo = [];
  linksObjects.each((index, element) => {
    linksInfo.push({
      text: $(element).text(), // get the text
      href: $(element).attr("href"), // get the href attribute
    });
  });
  return linksInfo;
};

module.exports = { validatePath, getFiles, getLinkInfo };
