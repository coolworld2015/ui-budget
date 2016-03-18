var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var ItemsModel = require('./mongo').ItemsModel;

var Items = {
    getItems: getItems,
    getFirstHundred: getFirstHundred,
    findItem: findItem,
    findPostItem: findPostItem,
    findByName: findByName,
    findByRegNum: findByRegNum,
    editItem: editItem,
    editPostItem: editPostItem,
    updateItem: updateItem,
    addItem: addItem,
    saveItem: saveItem,
    removeAllItems: removeAllItems,
    removeItem: removeItem,
    _sort: sort
};

module.exports.Items = Items;

function getItems(req, res) {
    return ItemsModel.find(function (err, items) {
        if (!err) {
            console.log('mongo - ' + items.length);
            return res.send(items);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    });
}

function getFirstHundred(req, res) {
    return ItemsModel.find(function (err, items) {
        if (!err) {
            console.log('mongoH - ' + items.length);
            return res.send(items);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    }).limit(1000);                                     //TODO 1000 records
}

function findItem(req, res) {
    ItemsModel.findOne({
        id: req.params.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        } else {
            console.log('mongo - ' + item.length);
            res.send(item);
        }
    });
}

function findPostItem(req, res) {
    ItemsModel.findOne({
        id: req.body.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        } else {
            res.send(item);
        }
    });
}

function findByName(req, res) {
    ItemsModel.find({
        "name": new RegExp(req.params.name, 'i')
    }, function (err, items) {
        if (err) {
            res.send({error: err.message});
        } else {
            console.log('mongo - ' + items.length);
            res.send(items);
        }
    });
}

function findByRegNum(req, res) {
    ItemsModel.find({
        "regnum": new RegExp(req.params.name)
    }, function (err, items) {
        if (err) {
            res.send({error: err.message});
        } else {
            console.log('mongo - ' + items.length);
            res.send(items);
        }
    });
}

function editItem(req, res) {
    ItemsModel.findOne({
        id: req.params.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        } else {
            item.name = req.params.name;
            item.save(function (err) {
                if (!err) {
                    res.send(item);
                } else {
                    return res.send(err);
                }
            });
        }
    });
}

function editPostItem(req, res) {
    ItemsModel.findOneAndUpdate({
            id: req.body.id
        },
        {$set: {name: req.body.name}},
        function (err, item) {
            if (!err) {
                res.send(item);
            } else {
                res.send({error: err.message});
            }
        });
}

function updateItem(req, res) {
    ItemsModel.findOne({
        id: req.body.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        } else {
            item.name = req.body.name;
            item.description = req.body.description;

            item.save(function (err) {
                if (!err) {
                    res.send(item);
                } else {
                    return res.send(err);
                }
            });
        }
    });
}

function addItem(req, res) {
    ItemsModel.create({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description
        },
        function (err, item) {
            if (err) {
                return res.send({error: 'Server error'});
            } else {
                res.send(item);
            }
        });
}

function saveItem(req, res) {
    var item = new ItemsModel({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
    });
    item.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.send(item);
        }
    });
}

function removeAllItems(req, res, err) {
    ItemsModel.remove({}, function (err) {
    });
    res.send('Collection Items was removed');
}

function removeItem(req, res) {
    ItemsModel.remove({
        "id": req.body.id
    }, function () {
        console.log('Item with id: ', req.body.id, ' was removed');
    });
    res.send('Item with id: ' + req.body.id + ' was removed');
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