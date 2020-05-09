const restify = require("restify");
const parse = require("./parse")
let server = restify.createServer();
server.listen(process.env.port || 3001 , function () {
/*
    parse.parseCSV("./example.csv", {
        seperator: ",",
        headers: false,
        modifyheader: (headers) => headers.map((header) => header.toUpperCase()),
      });
*/

parse.parseJSON("./example.json")
console.log("server is running")
})
