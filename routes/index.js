var express = require('express');
var router = express.Router();
var easyimage = require('easyimage');

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
        newPattern.photo = req.files.photo.name;
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
    //edit photos
    var url = 'public/uploads/' + newPattern.photo; 
    var newurl = 'public/newphotos/' + newPattern.photo; 
    easyimage.rescrop({
      src: url, dst: newurl,
      width:600, height:600,
      cropwidth: 600, cropheight:600,
      x:0, y:0
      }).then(function(image) {
        console.log('Resized and cropped');
      }, function(err) {
        console.log(err);
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

module.exports = router;
