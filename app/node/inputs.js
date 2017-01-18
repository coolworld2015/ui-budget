var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var InputsModel = require('./mongo').InputsModel;
var GoodsModel = require('./mongo').GoodsModel;
var DepartmentsModel = require('./mongo').DepartmentsModel;
var ProjectsModel = require('./mongo').ProjectsModel;
var EmployeesModel = require('./mongo').EmployeesModel;

var Inputs = {
    getInputs: getInputs,
    findPostInput: findPostInput,
    updateInput: updateInput,

    addInput: addInput,
    removeAllInputs: removeAllInputs,
    removeInput: removeInput
};

module.exports.Inputs = Inputs;

function getInputs(req, res) {
    return InputsModel.find(function (err, inputs) {
        if (!err) {
            return res.send(inputs);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    });
}

function findInput(req, res) {
    InputsModel.findOne({
        id: req.params.id
    }, function (err, input) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(input);
        res.send(input);
    });
}

function findPostInput(req, res) {
    InputsModel.findOne({
        id: req.body.id
    }, function (err, input) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(input);
        res.send(input);
    });
}

function editInput(req, res) {
    InputsModel.findOne({
        id: req.params.id
    }, function (err, input) {
        if (err) {
            res.send({error: err.message});
        }

        input.name = req.params.name;

        input.save(function (err) {
            if (!err) {
                res.send(input);
            } else {
                return res.send(err);
            }
        });
    });
}

function editPostInput(req, res) {
    InputsModel.findOneAndUpdate({
            id: req.body.id
        },
        {$set: {name: req.body.name}},
        function (err, input) {
            if (!err) {
                res.send(input);
            } else {
                res.send({error: err.message});
            }
        });
}

function updateInput(req, res) {
    InputsModel.findOne({
        id: req.body.id
    }, function (err, input) {
        if (err) {
            res.send({error: err.message});
        }
        input.invoiceID = req.body.number;
        input.project = req.body.project;
        input.projectID = req.body.projectID;
        input.date = req.body.date;
        input.total = req.body.total;
        input.description = req.body.description;

        input.save(function (err) {
            if (!err) {
                res.send(input);
            } else {
                return res.send(err);
            }
        });
    });
}

function addInput(req, res) {
    InputsModel.create({
            id: + new Date,
            invoiceID: req.body.invoiceID,
            project: req.body.project,
            projectID: req.body.projectID,

            department: req.body.department,
            departmentID: req.body.departmentID,
            employee: req.body.employee,
            employeeID: req.body.employeeID,
            product: req.body.product,
            productID: req.body.productID,
            quantity: req.body.quantity,
            price: req.body.price,

            date: req.body.date,
            total: req.body.total,
            description: req.body.description
        },
        function (err, input) {
            if (err) {
                return res.send({error: 'Server error'});
            } else {
				
				// Goods start here
				GoodsModel.findOne({
					id: req.body.productID
				}, 
				function (err, item) {
						if (err) {
							res.send({error: err.message});
						} else {

							item.name = item.name;
							item.price = item.price;
							item.quantity = +item.quantity + +req.body.quantity;
							item.store = true;
							item.description = item.description;

							item.save(function (err) {
								if (err) {
									res.send(err);
								} else {
																	
									// Departments start here
									DepartmentsModel.findOne({
										id: req.body.departmentID
									}, 
									function (err, department) {
											if (err) {
												res.send({error: err.message});
											} else {

												department.name = department.name;
												department.address = department.address;
												department.phone = department.phone;
												department.description = department.description;
												department.sum = +department.sum + +req.body.total;

												department.save(function (err) {
													if (err) {
														res.send(err);
													} else {
														
														// Projects start here
														ProjectsModel.findOne({
															id: req.body.projectID
														}, 
														function (err, project) {
																if (err) {
																	res.send({error: err.message});
																} else {

																	project.name = project.name;
																	project.address = project.address;
																	project.phone = project.phone;
																	project.description = project.description;
																	project.sum = +project.sum + +req.body.total;

																	project.save(function (err) {
																		if (err) {
																			res.send(err);
																		} else {
																			
																			// Employees start here
																			EmployeesModel.findOne({
																				id: req.body.employeeID
																			}, 
																			function (err, employee) {
																				if (err) {
																					res.send({error: err.message});
																				} else {

																					employee.name = employee.name;
																					employee.address = employee.address;
																					employee.phone = employee.phone;
																					employee.description = employee.description;
																					employee.sum = +employee.sum + +req.body.total;

																					employee.save(function (err) {
																						if (err) {
																							res.send(err);
																						} else {
																							console.log('Input with id: ', input.id, ' added');
																							res.send(employee);
																						}
																					});
																				}
																			});
																		}
																	});
																}
														});
													}
												});
											}
									});
								}
							});
						}
				});
			}
        });
}

function removeAllInputs(req, res, err) {
    InputsModel.remove({}, function (err) {
    });
    res.send('Collection Inputs removed');
}

function removeInput(req, res) {
    InputsModel.remove({
        "id": req.body.id
    }, function (err) {
		if (err) {
			res.send({error: err.message});
            } else {
				
				// Goods start here
				GoodsModel.findOne({
					id: req.body.productID
				}, 
				function (err, item) {
						if (err) {
							res.send({error: err.message});
						} else {

							item.name = item.name;
							item.price = item.price;
							item.quantity = +item.quantity - +req.body.quantity;
							item.store = true;
							item.description = item.description;

							item.save(function (err) {
								if (err) {
									res.send(err);
								} else {
																	
									// Departments start here
									DepartmentsModel.findOne({
										id: req.body.departmentID
									}, 
									function (err, department) {
											if (err) {
												res.send({error: err.message});
											} else {

												department.name = department.name;
												department.address = department.address;
												department.phone = department.phone;
												department.description = department.description;
												department.sum = +department.sum - +req.body.total;

												department.save(function (err) {
													if (err) {
														res.send(err);
													} else {
														
														// Projects start here
														ProjectsModel.findOne({
															id: req.body.projectID
														}, 
														function (err, project) {
																if (err) {
																	res.send({error: err.message});
																} else {

																	project.name = project.name;
																	project.address = project.address;
																	project.phone = project.phone;
																	project.description = project.description;
																	project.sum = +project.sum - +req.body.total;

																	project.save(function (err) {
																		if (err) {
																			res.send(err);
																		} else {
																			
																			// Employees start here
																			EmployeesModel.findOne({
																				id: req.body.employeeID
																			}, 
																			function (err, employee) {
																				if (err) {
																					res.send({error: err.message});
																				} else {

																					employee.name = employee.name;
																					employee.address = employee.address;
																					employee.phone = employee.phone;
																					employee.description = employee.description;
																					employee.sum = +employee.sum - +req.body.total;

																					employee.save(function (err) {
																						if (err) {
																							res.send(err);
																						} else {
																							console.log('Input with id: ', req.body.id, ' was removed');
																							res.send();
																						}
																					});
																				}
																			});
																		}
																	});
																}
														});
													}
												});
											}
									});
								}
							});
						}
				});
			}
    });
}