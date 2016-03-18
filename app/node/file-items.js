var fs = require("fs");
var fileName = "./items.json";
var jsonItems = require(fileName);

var Items = {
    getAll: getAll,
	getFirstHundred: getFirstHundred,
    findById: findById,
    findByName: findByName,
    findByRegNum: findByRegNum,
    addItem: addItem,
    updateItem: updateItem,
    removeItem: removeItem,
	_sort: sort
};

module.exports.Items = Items;

function getAll(req, res) {
    console.log(jsonItems.length);
    res.send(jsonItems);
}

function getFirstHundred(req, res) {
    var hundred = [].concat(jsonItems.sort(sort));
	hundred.splice(1000, 1000000);                  //TODO 1000 records
    console.log(hundred.length);
    console.log(req.ip);
    res.send(hundred);
}

function findById(req, res) {
    var id = req.params.id;
    var results = [];
    for (var i = 0; i < jsonItems.length; i++) {
        if (jsonItems[i].id == id) {
            results.push(jsonItems[i]);
        }
    }
    return res.send(results);
}

function findByName(req, res) {
    var name = req.params.name;
    var results = [];
    for (var i = 0; i < jsonItems.length; i++) {
        if (jsonItems[i].name.toUpperCase().indexOf(name.toUpperCase()) > -1) {
            results.push(jsonItems[i]);
        }
    }
    console.log(results.length);
    return res.send(results);
}

function findByRegNum(req, res) {
    var name = req.params.name;
    var results = [];
    for (var i = 0; i < jsonItems.length; i++) {
        if (jsonItems[i].regnum.toUpperCase().indexOf(name.toUpperCase()) > -1) {
            results.push(jsonItems[i]);
        }
    }
    console.log(results.length);
    return res.send(results);
}

function addItem(req, res) {
    var obj = {
        id: req.body.id,
        pic: req.body.pic,
        name: req.body.name,
        category: req.body.category,
        group: req.body.group,
        description: req.body.description
    };
    jsonItems.push(obj);
    fs.writeFile(fileName, JSON.stringify(jsonItems), "utf8", function () {
    });
    res.send('Ok');
}

function updateItem(req, res) {
    var id = req.body.id;
    var obj = {
        id: req.body.id,
        pic: req.body.pic,
        name: req.body.name,
        category: req.body.category,
        group: req.body.group,
        description: req.body.description
    };
    for (var i = 0; i < jsonItems.length; i++) {
        if (jsonItems[i].id == id) {
            jsonItems.splice(i, 1, obj);
            fs.writeFile(fileName, JSON.stringify(jsonItems), "utf8", function () {
            });
            break;
        }
    }
    res.send('Ok');
}

function removeItem(req, res) {
    var id = req.body.id;
    for (var i = 0; i < jsonItems.length; i++) {
        if (jsonItems[i].id == id) {
            jsonItems.splice(i, 1);
            fs.writeFile(fileName, JSON.stringify(jsonItems), "utf8", function () {
            });
            break;
        }
    }
    res.send('Ok');
}

function sort(a, b) {
	var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
	if (nameA < nameB) {
		return -1
	}
	if (nameA > nameB) {
		return 1
	}
	return 0;
}