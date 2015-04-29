var express = require('express');
var router = express.Router();

// location of db model
var Model = require("../models/model.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    Model.Pattern.find(function(e,docs) {
        //renders patternlist.jade with json object
    res.render('index', { 
            title: 'theKnit.net',
             "patternlist" : docs
        });
    });
});

/* GET Patternlist page. */
router.get('/allPatterns', function(req, res, next) {
    //finding all patterns as var "docs"
    Model.Pattern.find(function(e,docs) {
        //renders patternlist.jade with json object
        res.render('patternlist', {
            //paternlist is available to patternlist.jade
            "patternlist" : docs
        });
    });
});

/* GET New Pattern page. */
router.get('/newpattern', function(req,res) {
    res.render('newpattern', { title: 'Add a New Pattern' });
});

/* POST to Add Pattern Service */
router.post('/addpattern', function(req,res) {
    console.log(req.body);
    console.log(req.files);
    //get form values
    //these rely on "name" attribute 
    //create newPattern object with model from model.js
    var newPattern = new Model.Pattern();
        newPattern.name = req.body.name;
        newPattern.photo = req.files.path;
        newPattern.type = req.body.type;
        newPattern.needles = {
            size: req.body.needlesize,
            type: req.body.needletype
        };
        newPattern.yarnweight = req.body.yarnweight;
        newPattern.instructions = req.body.instructions;
        newPattern.sourcename = req.body.sourcename;
        newPattern.sourceurl = req.body.sourceurl;
    //add newPattern object to the db
    newPattern.save(function (err, doc) {
        if (err) {
            //if it failed, return error
            res.send("There was a problem adding the info to the database.");
        }
        else {
            //if it worked, set the header set the address bar
            res.location("/patterns/"+doc.id);
            //forward to success page
            res.redirect("/patterns/"+doc.id);
        }
    });
});

/* GET Pattern page. */
router.get('/patterns/:patternid', function(req, res, next) {
    //finding all patterns as var "docs"
    Model.Pattern.findById(req.params.patternid,function(err, docs) {
        if (err) {
            //if it failed, return error
            res.send("This id could not be found.");
        }
        else {
            //renders patternlist.jade with json object 
            res.render('patternpage', {
            //paternlist is available to patternlist.jade
                "pattern" : docs
            });
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
