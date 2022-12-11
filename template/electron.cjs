const fs = require("fs");
const ncp = require("ncp").ncp;
const packager = require("electron-packager");
const process = require("process");
const packageJson = require("./package.json");
const electronOpts = packageJson.electron;
var opts = {
  ...electronOpts,
  overwrite: true,
};

var electronPackageJson = {
  main: "main.js",
  name: packageJson.name,
};

ncp("build/html", "build/electron", function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  ncp("electron", "build/electron", function (err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    fs.writeFile(
      "build/electron/package.json",
      JSON.stringify(electronPackageJson),
      async function (err) {
        if (err) {
          console.error(err);
          process.exit(3);
        }
        const appPath = await packager(opts, function done(err) {
          if (err) {
            console.error(err);
            process.exit(4);
          }
        });
        console.log(appPath);
      }
    );
  });
});
