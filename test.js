// test.js
const connectDB = require("./config/db");
console.log(typeof connectDB); // should print 'function'
const generateToken = require("./utils/generateToken");
console.log(typeof generateToken); // should print 'function'
