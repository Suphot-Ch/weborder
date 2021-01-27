var fs = require('fs');
let debuged = true;

const data2Json = (datain) =>
{
  return JSON.parse(datain);
};
const json2data = (jsonin) =>
{
  return JSON.stringify(jsonin);
};
const fileRead = (path) =>
{
    let data = fs.readFileSync(path);
    let xjson = JSON.parse(data);
    if (debuged){
      console.log("Json Read! : ");
      console.log(path);
    }
    return xjson = JSON.parse(data);
};
const fileWrite = (path, xjson) =>
{
    let data = JSON.stringify(xjson, null, 2);
    fs.writeFileSync(path, data);
    if (debuged){
      console.log("Json Write! : ");
      console.log(path);
    }
};
exports.data2Json = data2Json;
exports.json2data = json2data;
exports.fileRead = fileRead;
exports.fileWrite = fileWrite;