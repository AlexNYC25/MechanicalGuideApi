var express = require('express');
var router = express.Router();

// switch model
let switches = require('../database/models/switches');
// Object id class for mongodb
const ObjectId = require('mongodb').ObjectID;

/*
    GET route for getting all switch data from database
*/
router.get('/', function(req, res, next) {

    switches.find()
        .then((results) => {
            res.send({
                switchData: results,
                message: "All Switch data",
                code: 200
            })
        })
        .catch((error) => {
            console.log(error);
            res.send({
                message: "There was an error in querying the database",
                code: 503
            })
        })
})

/*
    GET route for getting specific data for a specific switch from database
*/
router.get('/id/:id', function(req, res, next){
    
    let objectId = (req.params.id);
    
    if (objectId.length !== 24){
        res.send(
            {
                message:"Passed Switch ID is not the correct length",
                code: 400
            }
        )
        return;
    }

   switches.findById(new ObjectId(objectId))
    .then((results) => {
        let myResults = {}
        myResults.switchData = results

        if(results.length === 0){
            myResults.message = "There is no Switch data for this id " + req.params.id;
            myResults.code = 404
        }
        else {
            myResults.message = 'Switch data for ' + req.params.id;
            myResults.code = 200
        }
        
        res.send(myResults);
    })
    .catch((error) => { 
        console.log(error);
        res.send({
            message: "Some error occurred when querying database",
            code: 503
        })
    })
})

router.get("/type/:type", function(req, res, next){
    let type = (req.params.type);

    switches.find({type: type})
        .then((results) => {
            let returnResults = {};
            returnResults.switchData = results;

            if(results.length === 0){
                returnResults.message = 'No Switch data for Type: ' + req.params.type;
                returnResults.code = 404;
            }
            else {
                returnResults.message = 'Switch data for Type: ' + req.params.type;
                returnResults.code = 200;
            }

            res.send(returnResults)
        })
        .catch((error) => {
            console.log(error)
            res.send({
                message: "Some error occurred when querying database",
                code: 503
            })
        })
})

/*
    GET route for searching switch collection for using search query string
*/
router.get("/search/:searchQuery", function(req,res,next) {
    searchQuery = decodeURIComponent( req.params.searchQuery.replace(/\+/g, '%20') );

    switches.find({$text: {$search: searchQuery}})
        .then((results) => {
            let returnResults = {}
            returnResults.switchData = results;

            if(results.length === 0){
                returnResults.message = 'No Search Results for: ' + searchQuery;
                returnResults.code = 404;
            }
            else {
                returnResults.message = 'Search Results for ' + searchQuery;
                returnResults.code = 200;
            }

            res.send(returnResults)
        })
        .catch((error) => {
            console.log(error)
            res.send({
                message: "Some error occurred when querying database",
                code: 503
            })
        })
    
})


module.exports = router;