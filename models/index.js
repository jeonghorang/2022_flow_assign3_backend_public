const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb+srv://admin:password@horang.wahg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
db.users = require("./userModel.js")(mongoose);
db.bags = require("./bagModel.js")(mongoose);
db.bagletters = require("./bagLetterModel.js")(mongoose);
db.msgs = require("./msgModel.js")(mongoose);

module.exports = db;
