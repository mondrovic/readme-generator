const fs = require("fs");

// promises use resolve/reject. Resolve goes forward with code while reject throws an error
const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("../READMEtest.md", fileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }
      // if all is good, creates an object with status true and a message to let client know it was successful
      resolve({
        ok: true,
        message: "File Created",
      });
    });
  });
};

module.exports = writeFile;
