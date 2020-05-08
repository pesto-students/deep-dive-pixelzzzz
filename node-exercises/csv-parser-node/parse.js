const fs = require("fs");
exports.parseCSV = function (filePath, options) {
  const readStream = fs.createReadStream(filePath);
  let fileToBeRead = "";

  readStream.on("data", (chunk) => (fileToBeRead += chunk));

  readStream.on("end", () => {
    if (options.headers) {
      let fileToBeReadArray = fileToBeRead.split("\r\n");
      let keys = fileToBeReadArray.shift().split(options.seperator);
      if (options.modifyheader) {
        keys = options.modifyheader(keys);
      }
      const jsonData = fileToBeReadArray.map((firstLine) => {
        const subData = firstLine.split(options.seperator);
        const obj = {};
        for (let i = 0; i < keys.length; i += 1) {
          obj[keys[i]] = subData[i];
        }
        return obj;
      });
      console.log(jsonData);
    } else {
      let arrayData = [];
      const fileToBeReadArray = fileToBeRead.split("\r\n");
      fileToBeReadArray.forEach((line) => {
        let eachLineArray = [];
        let splitLine = line.split(options.seperator);
        splitLine.forEach((line) => eachLineArray.push(line));
        arrayData.push(eachLineArray);
      });
      console.log(arrayData);
    }
  });
  readStream.on("close", () => console.log("stream closed"));

  readStream.on("error", (error) => reject(error));
};
