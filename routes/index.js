var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'theKnit.net' });
});

/* GET Patternlist page. */
router.get('/patternlist', function(req, res, next) {
    //get db object
    var db = req.db;
    //tell app which collection to look at
    var collection = db.get('patterncollection');
    //do a find in this collection
    //return results as the variable 'docs'
    collection.find({},{},function(e,docs) {
        res.render('patternlist', {
            "patternlist" : docs
        });
    });
});

/* GET New Pattern page. */
router.get('/newpattern', function(req,res) {
    res.render('newpattern', { title: 'Add New Pattern' });
});

/*POST to Add Pattern Service */
router.post('/addpattern', function(req,res) {
    //get db object
    var db = req.db;
    //get form values
    //these rely on "name" attribute 
    var patternName = req.body.name;
    var patternType = req.body.type;
    //tell app which collection to look at
    var collection = db.get('patterncollection');
    //add to the db
    collection.insert({
        "name" : patternName,
        "type" : patternType
    }, function (err, doc) {
        if (err) {
            //if it failed, return error
            res.send("There was a problem adding the info to the database.");
        }
        else {
            //if it worked, set the header set the address bar
            res.location("patternlist");
            //forward to success page
            res.redirect("patternlist");
        }
    });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res, next) {
    //get db object
    var db = req.db;
    //tell app which collection to look at
    var collection = db.get('usercollection');
    //do a find in this collection
    //return results as the variable 'docs'
    collection.find({},{},function(e,docs) {
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req,res) {
    res.render('newuser', { title: 'Add New User' });
});

/*POST to Add User Service */
router.post('/adduser', function(req,res) {
    //get db object
    var db = req.db;
    //get form values
    //these rely on "name" attribute 
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    //tell app which collection to look at
    var collection = db.get('usercollection');
    //add to the db
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            //if it failed, return error
            res.send("There was a problem adding the info to the database.");
        }
        else {
            //if it worked, set the header set the address bar
            res.location("userlist");
            //forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
