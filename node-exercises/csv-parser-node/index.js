const restify = require("restify");
const parse = require("./parse");

let server = restify.createServer();
server.listen(process.env.port || 3000, function () {
  parse
    .parseCSV("./small.csv", {
      headers: false,
    })
    .then((data) => console.log(data));
  //parse.parseCSV("./example.csv", { headers: true });
  // parse.parseCSV("./file.csv", { headers: true });
  console.log("server is running");
});
