const { count } = require('console');
const { json } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');
const { send } = require('process');
const { request } = require('../app');
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
function readOrder(req, res, next){
    var log = JSON.parse(req.query.log);
    console.log(log);
    log.IP = req.connection.remoteAddress;
    var logger = appJson.fileRead('./public/json/history.json');
    logger.push(log);
    appJson.fileWrite('./public/json/history.json', logger);

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
    // console.log(sJson);
    counts.view += 1;
    
    var alarm = {
        status: "true",
        counter: counts.view,
        html: fn.refresh(0.1, ""),
        sData: sJson
    };
    // console.log(alarm);
    res.send(JSON.stringify(alarm));
    appJson.fileWrite('./public/json/counter.json', counts);
}
function readHistory(req, res, next){
    var history = appJson.fileRead('./public/json/history.json');
    var alarm = {
        status: "true",
        html: fn.refresh(0.1, ""),
        sData: history
    };
    // console.log(alarm);
    res.send(JSON.stringify(alarm));
}
router.get('/', function (req, res, next) {  
    console.log(req.query);
    console.log("remoteAddress : " + req.connection.remoteAddress);
    // console.log("remoteAddress : " + req.socket.remoteAddress);
    // appJson.fileWrite('./public/json/req.json', req);
    if(req.query.Action == 'order')
    {
        readOrder(req, res, next);
    }
    else if(req.query.Action == 'history')
    {
        readHistory(req, res, next);
    }
    else
    {
        var alarm = {
            status: "false",
            counter: "-",
            html: fn.refresh(0.1, ""),
            sData: "-"
        };
        // console.log(alarm);
        res.send(JSON.stringify(alarm));
    }
});

router.get('/login', function (req, res, next) {  
    console.log(req.query);
    var idname = require('./json/user.json');
    var status = "false";
    for(x in idname){
        if(idname[x].name == req.query.user || idname[x].email == req.query.user)
        {
            if(idname[x].password == req.query.pass)
            {
                status = "true";
                break;
            }
            else
                status = "Password Error";
        }
        else
            status = "User Error";
    }
    var login={
        status:status,
        path:status!="true"? "" : "add.html"
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