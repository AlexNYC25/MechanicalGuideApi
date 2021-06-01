var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainIntro', {layout: 'main'})
});

// fall back 404 error
router.get('/*', function(req, res, next) {
  res.status(400);
  res.render('error', {layout: 'main'})
})

module.exports = router;
