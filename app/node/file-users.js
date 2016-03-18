var fs = require("fs");
var fileName = "./users.json";
var jsonUsers = require(fileName);

var Users = {
    getAll: getAll,
    findById: findById,
    findByName: findByName,
    addItem: addItem,
    updateItem: updateItem,
    removeItem: removeItem
};

module.exports.Users = Users;

function getAll(req, res) {
    console.log(jsonUsers.length);
    res.send(jsonUsers);
}

function findById(req, res) {
    var id = req.params.id;
    var results = [];
    for (var i = 0; i < jsonUsers.length; i++) {
        if (jsonUsers[i].id == id) {
            results.push(jsonUsers[i]);
        }
    }
    return res.send(results);
}

function findByName(req, res) {
    var name = req.params.name;
    var results = [];
    for (var i = 0; i < jsonUsers.length; i++) {
        if (jsonUsers[i].name.toUpperCase().indexOf(name.toUpperCase()) > -1) {
            results.push(jsonUsers[i]);
        }
    }
    return res.send(results[0]);
}

function addItem(req, res) {
    var obj = {
        id: req.body.id,
        name: req.body.name,
        pass: req.body.pass,
        description: req.body.description
    };
    jsonUsers.push(obj);
    fs.writeFile(fileName, JSON.stringify(jsonUsers), "utf8", function () {
    });
    res.send('Ok');
}

function updateItem(req, res) {
    var id = req.body.id;
    var obj = {
        id: req.body.id,
        name: req.body.name,
        pass: req.body.pass,
        description: req.body.description
    };
    for (var i = 0; i < jsonUsers.length; i++) {
        if (jsonUsers[i].id == id) {
            jsonUsers.splice(i, 1, obj);
            fs.writeFile(fileName, JSON.stringify(jsonUsers), "utf8", function () {
            });
            break;
        }
    }
    res.send('Ok');
}

function removeItem(req, res) {
    var id = req.body.id;
    for (var i = 0; i < jsonUsers.length; i++) {
        if (jsonUsers[i].id == id) {
            jsonUsers.splice(i, 1);
            fs.writeFile(fileName, JSON.stringify(jsonUsers), "utf8", function () {
            });
            break;
        }
    }
    res.send('Ok');
}