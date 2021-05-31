var express = require('express');
var router = express.Router();



router.get('/switch', function(req, res, next) {
    res.render('switch', {layout: 'main'});
})

router.get('/', function(req, res, next) {
    res.render('documentation', {layout: 'main'})
})

module.exports = router;