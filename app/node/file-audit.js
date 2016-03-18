var fs = require("fs");
var fileName = "./audit.json";
var jsonAudit = require(fileName);

var Audit = {
    getAll: getAll,
    addItem: addItem
};

module.exports.Audit = Audit;

function getAll(req, res) {
    console.log(jsonAudit.length);
    res.send(jsonAudit);
}

function addItem(req, res) {
    var date = new Date().toJSON().slice(0,10);
    var time = new Date().toTimeString().slice(0,8);
    var obj = {
        id: req.body.id,
        name: req.body.name,
        date: date + ' ' + time,
        ip: req.ip,
        description: req.body.description
    };
    jsonAudit.push(obj);
    fs.writeFile(fileName, JSON.stringify(jsonAudit), "utf8", function () {
    });
    res.send('Ok');
}