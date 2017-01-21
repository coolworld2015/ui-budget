var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var OutputsModel = require('./mongo').OutputsModel;
var GoodsModel = require('./mongo').GoodsModel;
var DepartmentsModel = require('./mongo').DepartmentsModel;
var ProjectsModel = require('./mongo').ProjectsModel;
var EmployeesModel = require('./mongo').EmployeesModel;

var Outputs = {
    getOutputs: getOutputs,
    findPostOutput: findPostOutput,
    updateOutput: updateOutput,

    addOutput: addOutput,
    removeAllOutputs: removeAllOutputs,
    removeOutput: removeOutput
};

module.exports.Outputs = Outputs;

function getOutputs(req, res) {
    return OutputsModel.find(function (err, outputs) {
        if (!err) {
            return res.send(outputs);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    });
}

function findOutput(req, res) {
    OutputsModel.findOne({
        id: req.params.id
    }, function (err, output) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(output);
        res.send(output);
    });
}

function findPostOutput(req, res) {
    OutputsModel.findOne({
        id: req.body.id
    }, function (err, output) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(output);
        res.send(output);
    });
}

function editOutput(req, res) {
    OutputsModel.findOne({
        id: req.params.id
    }, function (err, output) {
        if (err) {
            res.send({error: err.message});
        }

        output.name = req.params.name;

        output.save(function (err) {
            if (!err) {
                res.send(output);
            } else {
                return res.send(err);
            }
        });
    });
}

function editPostOutput(req, res) {
    OutputsModel.findOneAndUpdate({
            id: req.body.id
        },
        {$set: {name: req.body.name}},
        function (err, output) {
            if (!err) {
                res.send(output);
            } else {
                res.send({error: err.message});
            }
        });
}

function updateOutput(req, res) {
    OutputsModel.findOne({
        id: req.body.id
    }, function (err, output) {
        if (err) {
            res.send({error: err.message});
        }
        output.number = req.body.number;
        output.client = req.body.client;
        output.clientID = req.body.clientID;
        output.date = req.body.date;
        output.total = req.body.total;
        output.description = req.body.description;

        output.save(function (err) {
            if (!err) {
                res.send(output);
            } else {
                return res.send(err);
            }
        });
    });
}

function addOutput(req, res) {
    OutputsModel.create({
            id: req.body.id,
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
        function (err, output) {
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
																							console.log('Output with id: ', output.id, ' added');
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

function removeAllOutputs(req, res, err) {
    OutputsModel.remove({}, function (err) {
    });
    res.send('Collection Outputs removed');
}

function removeOutput(req, res) {
    OutputsModel.remove({
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
																							console.log('Output with id: ', req.body.id, ' was removed');
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