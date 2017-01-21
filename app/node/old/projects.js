var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var ProjectsModel = require('./mongo').ProjectsModel;

var Projects = {
    getProjects: getProjects,
    findProject: findProject,
    findPostProject: findPostProject,
    editProject: editProject,
	editPostProject: editPostProject,
    updateProject: updateProject,
    addProject: addProject,
    saveProject: saveProject,
    removeAllProjects: removeAllProjects,
    removeProject: removeProject
};

module.exports.Projects = Projects;

function getProjects(req, res) {
    return ProjectsModel.find(function (err, projects) {
        if (!err) {
            return res.send(projects);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    });
}

function findProject(req, res) {
    ProjectsModel.findOne({
        id: req.params.id
    }, function (err, project) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(project);
        res.send(project);
    });
}

function findPostProject(req, res) {
    ProjectsModel.findOne({
        id: req.body.id
    }, function (err, project) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(project);
        res.send(project);
    });
}

function editProject(req, res) {
    ProjectsModel.findOne({
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

function editPostProject(req, res) {
    ProjectsModel.findOneAndUpdate({
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

function updateProject(req, res) {
    ProjectsModel.findOne({
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

function addProject(req, res) {
    ProjectsModel.create({
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

function saveProject(req, res) {
    console.log(req.body);
    var project = new ProjectsModel({
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

function removeAllProjects(req, res, err) {
    ProjectsModel.remove({}, function (err) {
    });
    res.send('Collection Projects removed');
}

function removeProject(req, res) {
    ProjectsModel.remove({
        "id": req.body.id
    }, function () {
        console.log('Project with id: ', req.body.id, ' was removed');
    });
    res.send('Project with id: ' + req.body.id + ' was removed');
}