const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// imported from mongodb "Connect"
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://infinfty:<password>@infinfty.hmmyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client2 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client2.connect(err => {
  const collection = client2.db("test").collection("devices");
  // perform actions on the collection object
  client2.close();
});

 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};