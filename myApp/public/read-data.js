const { count } = require('console');
const { json } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');
const { send } = require('process');
const app = require('../app');
var appJson = require('./app/app-json');
var fn = require('./app/global');
var debuglog = false;

var path = require('./json/path.json');

var pathData = `./public/data`;
const setpathjson = (years, files) => {
    return pathData + "/" + years + "/json/" + files + ".json";
}

// var years = require('./json/year2020.json');
// console.log(years);
// var yearx = years;
// yearx.month = "feb";
// appJson.fileWrite('./public/json/year2020.json', yearx);
// yearx.month = "";
// console.log(years);

/* GET home page. */
router.get('/', function (req, res, next) {  
    console.log(req.query);
    path = require('./json/path.json');
    counts = require('./json/counter.json');
    let index = 404;
    for(x in path){
        if(path[x].YEAR == req.query.YEAR){
            index = x;
        }
    }
    console.log("index : " + index);
    if(index == 404) return;
    
    var sJson = {TYPE : "JSON", DATA : []};
    console.log(path[index].PATH);
    for(x in path[index].PATH){
        var pth = appJson.fileRead(setpathjson(path[index].YEAR, path[index].PATH[x]));
        sJson.DATA.push(pth);
    }
    console.log(sJson);
    counts.view += 1;
    var alarm = {
        status: "true",
        counter: counts.view,
        html: fn.refresh(0.1, ""),
        sData: sJson
    };
    console.log(alarm);
    res.send(JSON.stringify(alarm));
    appJson.fileWrite('./public/json/counter.json', counts);
});

router.get('/login', function (req, res, next) {  
    console.log(req.query);
    var login={
        status:"true",
        path:"add.html"
    };
    var alarm = {
        status: "true",
        // counter: counts.view,
        // html: fn.refresh(0.1, ""),
        sData: login
    };
    console.log(alarm);
    res.send(JSON.stringify(alarm));
});
module.exports = router;