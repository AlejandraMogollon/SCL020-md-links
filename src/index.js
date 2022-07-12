const { readFileSync } = require("fs");
const markdownLinkExtractor = require("markdown-link-extractor");
const { validatePath, getLinkInfo } = require("./functions/functions.js");
const axios = require("axios");

const mdLinks = (path, options) => {
  const vPath = validatePath(path);

  const uniqueLink = [];
  let allLinks = [];
  let optDat;

  for (let i = 0; i < vPath.length; i++) {
    const mdFile = vPath[i];

    // Sacar archivos de cada path
    const markdown = readFileSync(mdFile, {
      encoding: "utf8",
    });

    const links = markdownLinkExtractor(markdown);

    if (i === 0) {
      optDat = { total: links.length, unique: 0, broken: 0 };
    }

    optDat.total = optDat.total + links.length;

    links.forEach((link, index) => {
      const linkInfo = getLinkInfo(markdown);

      //---- Validate true -- stats true
      if (options.validate && options.stats) {
        const axiosResp = axios
          .get(link)
          .then((resp) => {
            if (!uniqueLink.includes(link)) {
              uniqueLink.push(link);
              optDat.unique = optDat.unique + 1;
            }
            return optDat;
          })
          .catch((error) => {
            optDat.broken = optDat.broken + 1;
            console.log(error.message);
            return optDat;
          });
        allLinks.push(axiosResp);
        return axiosResp;
      }

      //------ validate true
      if (options.validate) {
        const axiosResp = axios
          .get(link)
          .then((resp) => {
            return {
              href: linkInfo[index].href,
              text: linkInfo[index].text,
              file: mdFile,
              status: resp.status,
              ok: resp.statusText,
            };
          })
          .catch((error) => {
            console.log(error.message);
            return {
              href: linkInfo[index].href,
              text: linkInfo[index].text,
              file: mdFile,
              error: "invalid link",
              message: error.message,
            };
          });
        allLinks.push(axiosResp);
        return axiosResp;
      }

      //---- stats true
      if (options.stats) {
        const axiosResp = axios
          .get(link)
          .then((resp) => {
            if (!uniqueLink.includes(link)) {
              uniqueLink.push(link);
              optDat.unique = optDat.unique + 1;
            }
            delete optDat.broken;
            return optDat;
          })
          .catch((error) => {
            delete optDat.broken;
            console.log(error.message);
            return optDat;
          });
        allLinks.push(axiosResp);
        return axiosResp;
      }

      //----- Validate and Stats false
      if (!options.validate || !options.stats) {
        const axiosResp = axios
          .get(link)
          .then((resp) => {
            return {
              href: linkInfo[index].href,
              text: linkInfo[index].text,
              file: mdFile,
            };
          })
          .catch((error) => {
            console.log(error.message);
            return {
              href: linkInfo[index].href,
              text: linkInfo[index].text,
              file: mdFile,
              error: "invalid link",
              message: error.message,
            };
          });
        allLinks.push(axiosResp);
        return axiosResp;
      }
    });
  }

  return options.stats
    ? Promise.all(allLinks).then((e) => e[0])
    : Promise.all(allLinks);
};

module.exports = { mdLinks };
