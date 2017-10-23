var express=require('express');
var app= express();
var MongoClient = require('mongodb').MongoClient;
var url='mongodb://127.0.0.1:27017/data';
var bodyParser = require('body-parser');
var path=require('path');
var mongoose=require('mongoose');

/*mongoose to save data
mongoose.Promise = global.Promise;
mongoose.connect(url);

var nameSchema = new mongoose.Schema({
 Name: String,
 Email: String,
 Comment:String
});

var User = mongoose.model("User", nameSchema);*/

//bodyparser acting as middleware btw express and POST request-converts data to json
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(express.static (path.resolve(__dirname, 'public')));

//make the app listen at port 3000
app.listen(process.env.port || 3000, process.env.IP || '0.0.0.0');
console.log('Server running at port 3000');

// Loads the page form.html
app.get("/", (req, res) => {
 res.sendFile(__dirname + "/form.html");
});

//db connection established
var dbConn=MongoClient.connect(url);
MongoClient.connect(url, function(err, db) {
  if(!err) {
    console.log("Mongo is connected");
 }});



//post feedback of data in Json format
app.post('/feedback', (req, res) => {
    console.log(req.body);//prints console with data
    //Inserts the data in the datbase collections
    dbConn.then(function(db) {
    db.collection('feedbacks').insertOne(req.body);
        res.send('Data received:\n' + JSON.stringify(req.body));
          });
        });

app.get('/view-feedbacks',  function(req, res) {
  MongoClient.connect(url, function(err,db){
    if(!err)
    {
        console.log('viewing feedbacks');
    }

  });
      dbConn.then(function(db) {

      db.collection('feedbacks').
        find({}).toArray()
          .then(function(feedbacks) {
            res.send('Collection:\n' +JSON.stringify(feedbacks));
                    //  res.status(200).json(feedbacks);
                  });
              });
            });
