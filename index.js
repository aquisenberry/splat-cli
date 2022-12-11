#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const readline = require("readline");
const pkgJson = require("./example.package.json");

const dir = process.argv[2];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (!dir) {
  return console.error(
    "please enter project name, run: splat-cli [project-name]"
  );
}
if (fs.existsSync(dir)) {
  return console.error("directory exists, please choose another name");
}

try {
  rl.question(`What is the name of your project? (${dir}): `, (name) => {
    pkgJson.name = name || dir;
    pkgJson.appMetadata.appName = pkgJson.name.replaceAll("-", " ");
    rl.question(`Description? (${pkgJson.description}): `, (description) => {
      pkgJson.description = description || pkgJson.description;
      rl.question(`Author?: `, (author) => {
        pkgJson.author = author || "";
        rl.close();
        fs.mkdirSync(dir);
        fs.copySync(path.join(__dirname, "template/"), dir);
        fs.writeJson(path.join(dir, "package.json"), pkgJson);
        console.log(
          `To finish setup run the following command: \n\tcd ${dir} && npm install`
        );
      });
    });
  });
} catch (err) {
  return console.error(err);
}
