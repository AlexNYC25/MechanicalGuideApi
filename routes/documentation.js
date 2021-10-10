var express = require('express');
var router = express.Router();

// get documentation page related to switch endpoint routes
router.get('/switch', function(req, res, next) {
    res.render('switch', {layout: 'main'});
})

// get table of contents page for documentation
router.get('/', function(req, res, next) {
    res.render('documentation', {layout: 'main'})
})

module.exports = router;