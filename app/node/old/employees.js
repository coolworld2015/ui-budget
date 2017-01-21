var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var EmployeesModel = require('./mongo').EmployeesModel;

var Employees = {
    getEmployees: getEmployees,
    findEmployee: findEmployee,
    findPostEmployee: findPostEmployee,
    editEmployee: editEmployee,
	editPostEmployee: editPostEmployee,
    updateEmployee: updateEmployee,
    addEmployee: addEmployee,
    saveEmployee: saveEmployee,
    removeAllEmployees: removeAllEmployees,
    removeEmployee: removeEmployee
};

module.exports.Employees = Employees;

function getEmployees(req, res) {
    return EmployeesModel.find(function (err, employees) {
        if (!err) {
            return res.send(employees);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    });
}

function findEmployee(req, res) {
    EmployeesModel.findOne({
        id: req.params.id
    }, function (err, employee) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(employee);
        res.send(employee);
    });
}

function findPostEmployee(req, res) {
    EmployeesModel.findOne({
        id: req.body.id
    }, function (err, employee) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(employee);
        res.send(employee);
    });
}

function editEmployee(req, res) {
    EmployeesModel.findOne({
        id: req.params.id
    }, function (err, employee) {
        if (err) {
            res.send({error: err.message});
        }

        employee.name = req.params.name;

        employee.save(function (err) {
            if (!err) {
                res.send(employee);
            } else {
                return res.send(err);
            }
        });
    });
}

function editPostEmployee(req, res) {
    EmployeesModel.findOneAndUpdate({
            id: req.body.id
        },
        {$set: {name: req.body.name}},
        function (err, employee) {
            if (!err) {
                res.send(employee);
            } else {
                res.send({error: err.message});
            }
        });
}

function updateEmployee(req, res) {
    EmployeesModel.findOne({
        id: req.body.id
    }, function (err, employee) {
        if (err) {
            res.send({error: err.message});
        }

        employee.name = req.body.name;
        employee.address = req.body.address;
        employee.phone = req.body.phone;
        employee.description = req.body.description;
        employee.sum = req.body.sum;

        employee.save(function (err) {
            if (!err) {
                res.send(employee);
            } else {
                return res.send(err);
            }
        });
    });
}

function addEmployee(req, res) {
    EmployeesModel.create({
            id: req.body.id,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            description: req.body.description,
            sum: req.body.sum
        },
        function (err, employee) {
            if (err) {
                return res.send({error: 'Server error'});
            }
            res.send(employee);
        });
}

function saveEmployee(req, res) {
    console.log(req.body);
    var employee = new EmployeesModel({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        description: req.body.description,
        sum: req.body.sum
    });
    employee.save(function (err) {
        if (!err) {
            res.send(employee);
        } else {
            return res.send(err);
        }
    });
}

function removeAllEmployees(req, res, err) {
    EmployeesModel.remove({}, function (err) {
    });
    res.send('Collection Employees removed');
}

function removeEmployee(req, res) {
    EmployeesModel.remove({
        "id": req.body.id
    }, function () {
        console.log('Employee with id: ', req.body.id, ' was removed');
    });
    res.send('Employee with id: ' + req.body.id + ' was removed');
}