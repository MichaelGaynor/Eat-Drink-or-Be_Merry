var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/drink', (req, res)=>{
    var apiBaseUrl = 'http://api.brewerydb.com/v2/';
    var abvSearchedFor = req.body.abvString;
    var searchUrl = apiBaseUrl + 'beers/?abv=' + abvSearchedFor + '&key=' + config.goldenTicket;
    console.log(config.goldenTicket)
    request.get(searchUrl,(error, response, beerData)=>{
        var beerData = JSON.parse(beerData);
        // console.log(beerData);
        // console.log(beerData.data[1]);
        res.render('drink', {
            beerData: beerData
        });
    });
})

module.exports = router;
