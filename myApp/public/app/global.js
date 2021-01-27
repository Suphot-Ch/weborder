const refresh = (delay, link) => {
    return `<meta http-equiv = "refresh" content = "` + delay + ` ; url = /`+link+`">`;
};
const sendalarm = (color, test) => {
    return `<div id="alarm" style="padding: 10px 10px; border: 3px solid ` + color + `;">` + test + `</div><br>`;
};

exports.refresh = refresh;
exports.sendalarm = sendalarm;