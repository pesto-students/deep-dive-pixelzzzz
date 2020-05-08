const restify = require("restify");
const parse = require("./parse");

let server = restify.createServer();
server.listen(process.env.port || 3000, function () {
  parse.parseCSV("./example.csv", {
    seperator: ",",
    headers: false,
    modifyheader: (headers) => headers.map((header) => header.toUpperCase()),
  });
  //parse.parseCSV("./example.csv", { seperator: ",", headers: true });
  // parse.parseCSV("./file.csv", { seperator: ";", headers: true });
  console.log("server is running");
});
