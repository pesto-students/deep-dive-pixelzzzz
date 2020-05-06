const restify = require("restify");

let server = restify.createServer();
server.listen(process.env.port || 3000 , function () {

console.log("server is running")
})
