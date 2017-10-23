var MongoClient = require('mongodb').MongoClient;
var url='mongodb://127.0.0.1:27017/data';
// Connect to the db

var dbconnect=MongoClient.connect(url);
MongoClient.connect(url, function(err, db) {
db.collection('User', function (err, collection) {

         collection.find().toArray(function(err, items)
          {
            if(err) throw err;
            console.log(items);
          });
    });
  });
