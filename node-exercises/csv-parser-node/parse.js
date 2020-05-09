const fs = require("fs");
exports.parseCSV = function (filePath, options) {
  return new Promise((res, rej) => {
    const readStream = fs.createReadStream(filePath);
    let fileToBeRead = "";

    readStream.on("data", (chunk) => (fileToBeRead += chunk));

    readStream.on("end", () => {
      if (options.headers) {
        let keys;
        const fileToBeReadArray = fileToBeRead.split("\r\n");
        if (fileToBeReadArray[0][0] === "#") {
          fileToBeReadArray.shift(); //remove the commented line
          keys = fileToBeReadArray.shift().split(",");
        } else {
          keys = fileToBeReadArray.shift().split(",");
        }
        if (fileToBeReadArray[fileToBeReadArray.length - 1][0] === "#") {
          fileToBeReadArray.pop();
        }
        if (options.modifyheader) {
          keys = options.modifyheader(keys);
        }
        const jsonData = fileToBeReadArray.map((line) => {
          const subData = line.split(",");
          const obj = {};
          for (let i = 0; i < keys.length; i += 1) {
            obj[keys[i]] = subData[i];
          }
          return obj;
        });
        res(jsonData);
      } else {
        let arrayData = [];
        const fileToBeReadArray = fileToBeRead.split("\r\n");
        fileToBeReadArray.forEach((line) => {
          let eachLineArray = [];
          let splitLine = line.split(",");
          splitLine.forEach((line) => eachLineArray.push(line));
          arrayData.push(eachLineArray);
        });
        res(arrayData);
      }
    });
    readStream.on("close", () => console.log("stream closed"));

    readStream.on("error", (error) => reject(error));
  });
};
