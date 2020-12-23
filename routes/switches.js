var express = require('express');
var router = express.Router();

var database = require('../server/mongoController');

/*
    GET route for getting all switch data from database
*/
router.get('/', function(req, res, next) {
    //res.send("Test");
    database.getAllSwitches().then((results) => {
        res.send(results)
    })
    //res.send(());
})

/*
    GET route for getting specific data for a specific switch from database
*/
router.get('/:id', function(req, res, next){
    console.log(req.params.id)
    database.getSwitchId(req.params.id).then((results) => {
        res.send(results);
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