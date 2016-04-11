var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var DepartmentsModel = require('./mongo').DepartmentsModel;

var Departments = {
    getDepartments: getDepartments,
    findDepartment: findDepartment,
    findPostDepartment: findPostDepartment,
    editDepartment: editDepartment,
	editPostDepartment: editPostDepartment,
    updateDepartment: updateDepartment,
    addDepartment: addDepartment,
    saveDepartment: saveDepartment,
    removeAllDepartments: removeAllDepartments,
    removeDepartment: removeDepartment
};

module.exports.Departments = Departments;

function getDepartments(req, res) {
    return DepartmentsModel.find(function (err, projects) {
        if (!err) {
            return res.send(projects);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    });
}

function findDepartment(req, res) {
    DepartmentsModel.findOne({
        id: req.params.id
    }, function (err, project) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(project);
        res.send(project);
    });
}

function findPostDepartment(req, res) {
    DepartmentsModel.findOne({
        id: req.body.id
    }, function (err, project) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(project);
        res.send(project);
    });
}

function editDepartment(req, res) {
    DepartmentsModel.findOne({
        id: req.params.id
    }, function (err, project) {
        if (err) {
            res.send({error: err.message});
        }

        project.name = req.params.name;

        project.save(function (err) {
            if (!err) {
                res.send(project);
            } else {
                return res.send(err);
            }
        });
    });
}

function editPostDepartment(req, res) {
    DepartmentsModel.findOneAndUpdate({
            id: req.body.id
        },
        {$set: {name: req.body.name}},
        function (err, project) {
            if (!err) {
                res.send(project);
            } else {
                res.send({error: err.message});
            }
        });
}

function updateDepartment(req, res) {
    DepartmentsModel.findOne({
        id: req.body.id
    }, function (err, project) {
        if (err) {
            res.send({error: err.message});
        }

        project.name = req.body.name;
        project.address = req.body.address;
        project.phone = req.body.phone;
        project.description = req.body.description;
        project.sum = req.body.sum;

        project.save(function (err) {
            if (!err) {
                res.send(project);
            } else {
                return res.send(err);
            }
        });
    });
}

function addDepartment(req, res) {
    DepartmentsModel.create({
            id: req.body.id,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            description: req.body.description,
            sum: req.body.sum
        },
        function (err, project) {
            if (err) {
                return res.send({error: 'Server error'});
            }
            res.send(project);
        });
}

function saveDepartment(req, res) {
    console.log(req.body);
    var project = new DepartmentsModel({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        description: req.body.description,
        sum: req.body.sum
    });
    project.save(function (err) {
        if (!err) {
            res.send(project);
        } else {
            return res.send(err);
        }
    });
}

function removeAllDepartments(req, res, err) {
    DepartmentsModel.remove({}, function (err) {
    });
    res.send('Collection Departments removed');
}

function removeDepartment(req, res) {
    DepartmentsModel.remove({
        "id": req.body.id
    }, function () {
        console.log('Department with id: ', req.body.id, ' was removed');
    });
    res.send('Department with id: ' + req.body.id + ' was removed');
}