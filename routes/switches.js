var express = require('express');
var router = express.Router();

//var database = require('../server/mongoController');

let switches = require('../database/models/switches');

const ObjectId = require('mongodb').ObjectID;

/*
    GET route for getting all switch data from database
*/
router.get('/', function(req, res, next) {

    switches.find()
        .then((results) => {
            res.send(results);
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

    switches.find({_id: new ObjectId(objectId)})
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
            res.send(results)
        })
        .catch((error) => {
            console.log(error)
        })
})


/*
    DELETE route for deleting switch from database
*/
router.delete('/switches/:id', function(req, res, next){

})

/*
    POST route for passing modifications to a specific switch object in the database
*/
router.post('/switches/:id', function(req, res, next){

})





module.exports = router;