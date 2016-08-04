var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var url = require('url');
var qs = require('querystring');
var app=express();
var dbUrl='mongodb://localhost:27017/user';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+'../../../dist'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'../../../dist/index.html'));
});

app.route('/api/user')
    .get(function(req,res){
        var query = url.parse(req.url,true).query;
        console.log(query);
        MongoClient.connect(dbUrl,function(err,db){
            if(!err){
                db.collection('usertable',function(err, collection){
                    collection.count(query, function(err, count){
                       //res.sendStatus(count);
                        if(count > 0){
                            res.status(200);
                            res.send(JSON.stringify(count));
                        }else{
                            res.status(400);
                            res.send(JSON.stringify(count));
                        }

                        db.close();
                    });
                });
            }else{
                res.send('Connection Failure');
            }
        });
    })
    .post(function(req,res){
        var item = req.body;
        MongoClient.connect(dbUrl,function(err,db){
            if(!err){
                db.collection('usertable',function(err, collection){
                    collection.insert(item,{safe:true},function(err, result){
                       if(!err) {
                           res.send(result);
                           db.close();
                       }
                        else
                       res.send(err);
                    });
                });
            }else{
                res.send('Connection Failure');
            }
        });
    })
    .put(function(req,res){
        MongoClient.connect(dbUrl,function(err,db){
            if(!err){
                res.send('Connection Successful')
            }else{
                res.send('Connection Failure');
            }
        });
    });

//Start a MongoDB
//add mongod in PATH variable
// Open a command prompt in server folder
// mongod --dbpath db

app.listen(9090);
console.log('App Running at port : 9090');