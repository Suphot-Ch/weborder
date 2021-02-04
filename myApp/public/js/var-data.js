var media_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var media_width_;

var IndexMain;
var host = "";
// var host = "http://melody-mas.trueddns.com:62284";
// var host = "http://localhost:2021";

console.log("media_width : " + media_width);
var media_width_run = setInterval(function() {
    media_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(media_width_ != media_width){
        media_width_ = media_width;
        setTable(IndexMain);
    }
}, 500);