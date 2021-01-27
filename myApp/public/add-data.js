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
function setpathjson(years, files) {
    return pathData + "/" + years + "/json/" + files;
}

var IndexOf = (dIn, keyword) => {
    let indexOut = -1;
    for(x in dIn){
        if(dIn[x] == keyword){
            indexOut = x;
        }
    }
    return indexOut;
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('add.html', { title: 'Express' });
});
router.get('/save', function (req, res, next) {
    console.log(req.query);
    var work = JSON.parse(req.query.json);
    path = require('./json/path.json');
    var index = {
        year:-1,
        path:-1,
    };
    for(x in path){
        if(path[x].YEAR == req.query.year){
            index.year = x;
        }
    }
    console.log(index);
    if (work.ORDER == "") {
        var alarm = {
            status: "true",
            html: fn.sendalarm("red", "Error filename don't save!")
        };
        // console.log(json);
        res.send(JSON.stringify(alarm));
    } else {
        if(index.year != -1) {
            index.path = IndexOf(path[index.year].PATH, work.ORDER);
            console.log(index);
        }
        if(index.path == -1) {
            // if(path.indexOf(req.query.year))
            path[index.year].PATH.push(work.ORDER);
            appJson.fileWrite("./public/data/" + req.query.year + "/json/" + work.ORDER + ".json", work);
            appJson.fileWrite("./public/json/path.json", path);
            var alarm = {
                status: "true",
                html: fn.refresh(0.1, "add.html")
            };
            // console.log(json);
            res.send(JSON.stringify(alarm));
        }else{
            var alarm = {
                status: "true",
                html: fn.sendalarm("red", "Error filename don't save!")
            };
            // console.log(json);
            res.send(JSON.stringify(alarm));
        }
    }
});

module.exports = router;