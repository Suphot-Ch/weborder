const { json } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');
const { send } = require('process');
const app = require('../app');
var appJson = require('./app/app-json');
var debuglog = false;

var pathData = `./public/data`;
function setpathjson(years, files) {
    return pathData + "/" + years + "/json/" + files;
}

// var years = require('./json/year2020.json');
// console.log(years);
// var yearx = years;
// yearx.month = "feb";
// appJson.fileWrite('./public/json/year2020.json', yearx);
// yearx.month = "";
// console.log(years);
var refresh = (delay, link) => {
    return `<meta http-equiv = "refresh" content = "` + delay + ` ; url = /`+link+`">`;
};
var sendalarm = (color, test) => {
    return `<div id="alarm" style="padding: 10px 10px; border: 3px solid ` + color + `;">` + test + `</div><br>`;
};
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('add.html', { title: 'Express' });
});
router.get('/save', function (req, res, next) {
    console.log(req.query);
    var work = JSON.parse(req.query.json);
    if (work.ORDER == "") {
        var alarm = {
            status: "true",
            html: sendalarm("red", "Error filename don't save!")
        };
        // console.log(json);
        res.send(JSON.stringify(alarm));
    } else {
        appJson.fileWrite("./public/data/" + req.query.year + "/json/" + work.ORDER + ".json", work);
        var alarm = {
            status: "true",
            html: refresh(0.1, "")
        };
        // console.log(json);
        res.send(JSON.stringify(alarm));
    }
});

module.exports = router;