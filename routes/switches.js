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
        })
        .catch((error) => {
            console.log(error);
        })
})

/*
    GET route for getting specific data for a specific switch from database
*/
router.get('/:id', function(req, res, next){
    let objectId = new ObjectId(req.params.id);
    /*
    database.getSwitchId(req.params.id).then((results) => {
        res.send(results);
    })
    */
    switches.find({_id: objectId})
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            console.log(error);
        })
    //res.send();
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