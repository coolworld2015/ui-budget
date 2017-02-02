var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser({limit: '50mb'}));

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on 3000');
});

app.get('/', function (req, res) {
	//res.sendFile(__dirname + '/build/index.html');
	res.sendFile(__dirname + '/auth.html');			//	MUST REMOVE !!!
    //res.send('It is just API Server...');
});

//app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, accept, authorization');
    next();
});

//------------------------------------------------------------------------ JWT
var jwt = require('jsonwebtoken');
var secret = 'f3oLigPb3vGCg9lgL0Bs97wySTCCuvYdOZg9zqTY32o';

var token = jwt.sign({auth:  'magic'}, secret, { expiresIn: 60 * 60 });

setInterval(function(){
	token = jwt.sign({auth:  'magic'}, secret, { expiresIn: 60 * 60 });
	}, 1000 * 60 * 60);

//------------------------------------------------------------------------ Models
var AuditModel = require('./mongo').AuditModel;
var UsersModel = require('./mongo').UsersModel;
var EmployeesModel = require('./mongo').EmployeesModel;
var DepartmentsModel = require('./mongo').DepartmentsModel;
var ProjectsModel = require('./mongo').ProjectsModel;
var GoodsModel = require('./mongo').GoodsModel;
var InputsModel = require('./mongo').InputsModel;
var OutputsModel = require('./mongo').OutputsModel;

//------------------------------------------------------------------------ API
app.post('/api/login', Login);

app.get('/api/audit/get', getAudit);
app.post('/api/audit/add', addAudit);

app.get('/api/users/get', getUsers);
app.post('/api/users/add', addUser);
app.post('/api/users/update', updateUser);
app.post('/api/users/delete', deleteUser);

app.get('/api/employees/get', getEmployees);
app.post('/api/employees/add', addEmployee);
app.post('/api/employees/update', updateEmployee);
app.post('/api/employees/delete', deleteEmployee);

app.get('/api/departments/get', getDepartments);
app.post('/api/departments/add', addDepartment);
app.post('/api/departments/update', updateDepartment);
app.post('/api/departments/delete', deleteDepartment);

app.get('/api/projects/get', getProjects);
app.post('/api/projects/add', addProject);
app.post('/api/projects/update', updateProject);
app.post('/api/projects/delete', deleteProject);

app.get('/api/goods/get', getGoods);
app.post('/api/goods/add', addGood);
app.post('/api/goods/update', updateGood);
app.post('/api/goods/delete', deleteGood);

app.get('/api/inputs/get', getInputs);
app.post('/api/inputs/add', addInput);
app.post('/api/inputs/delete', deleteInput);

app.get('/api/outputs/get', getOutputs);
app.post('/api/outputs/add', addOutput);
app.post('/api/outputs/delete', deleteOutput);

//------------------------------------------------------------------------ Login
function Login(req, res) {
    UsersModel.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) {
            res.send({error: err.message});
        } 
		if (user) {
			if (user.pass == req.body.pass) {

				// Audit start
				var date = new Date().toJSON().slice(0, 10);
				var time = new Date().toTimeString().slice(0, 8);
				AuditModel.create({
					id: + new Date(),
					name: req.body.name,
					date: date + ' ' + time,
					ip: req.ip,
					description: req.body.description
				},
				function (err, audit) {
					if (err) {
						return res.send({error: 'Server error'});
					} else {
						res.send({token: token}); // Send TOKEN here !!!
					}
				});
				// Audit end
				
			} else {
				res.status(403).send({ 
					success: false, 
					message: 'No such pass.' 
				});
			}
		} else {
			res.status(403).send({ 
				success: false, 
				message: 'No such user.' 
			});
		}

    });
}

//------------------------------------------------------------------------ Audit
function getAudit(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			AuditModel.find(function (err, audit) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					res.send(audit);
				}
			}).sort({date: -1}); 
		}
	});
}

function addAudit(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			var date = new Date().toJSON().slice(0, 10);
			var time = new Date().toTimeString().slice(0, 8);
			AuditModel.create({
					id: req.body.id,
					name: req.body.name,
					date: date + ' ' + time,
					ip: req.ip,
					description: req.body.description
				},
				function (err, audit) {
					if (err) {
						return res.send({error: 'Server error'});
					} else {
						res.send(audit);
					}
				});
		}
	});	
}

//------------------------------------------------------------------------ Users
function getUsers(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			return UsersModel.find(function (err, users) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					res.send(users);
				}
			});
		}
	});
}

function addUser(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			UsersModel.create({
					id: req.body.id,
					name: req.body.name,
					pass: req.body.pass,
					description: req.body.description
				},
				function (err, user) {
					if (err) {
						return res.send({error: 'Server error'});
					} else {
						res.send(user);
					}
				});
		}
	});
}

function updateUser(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			UsersModel.findOne({
				id: req.body.id
			}, function (err, user) {
				if (err) {
					return res.send({error: err.message});
				} else {
					user.name = req.body.name;
					user.pass = req.body.pass;
					user.description = req.body.description;

					user.save(function (err) {
						if (err) {
							return res.send({error: 'Server error'});
						} else {
							res.send(user);
						}
					});
				}	
			});
		}
	});
}

function deleteUser(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			UsersModel.remove({
				"id": req.body.id
			}, 
			function (err) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					console.log('User with id: ', req.body.id, ' was removed');
					res.send('User with id: ' + req.body.id + ' was removed');
				}
			});
		}
	});
}

//------------------------------------------------------------------------ Employees
function getEmployees(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			return EmployeesModel.find(function (err, employees) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					res.send(employees);
				}
			});
		}
	});
}

function addEmployee(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
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
					} else {
						res.send(employee);
					}
				});
		}
	});
}

function updateEmployee(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			EmployeesModel.findOne({
				id: req.body.id
			}, function (err, employee) {
				if (err) {
					return res.send({error: err.message});
				} else {
					employee.name = req.body.name;
					employee.address = req.body.address;
					employee.phone = req.body.phone;
					employee.description = req.body.description;
					employee.sum = req.body.sum;

					employee.save(function (err) {
						if (err) {
							return res.send({error: 'Server error'});
						} else {
							res.send(employee);
						}
					});
				}	
			});
		}
	});
}

function deleteEmployee(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			EmployeesModel.remove({
				"id": req.body.id
			}, 
			function (err) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					console.log('Employee with id: ', req.body.id, ' was removed');
					res.send('Employee with id: ' + req.body.id + ' was removed');
				}
			});
		}
	});
}

//------------------------------------------------------------------------ Departments
function getDepartments(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			return DepartmentsModel.find(function (err, departments) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					res.send(departments);
				}
			});
		}
	});
}

function addDepartment(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			DepartmentsModel.create({
					id: req.body.id,
					name: req.body.name,
					address: req.body.address,
					phone: req.body.phone,
					description: req.body.description,
					sum: req.body.sum
				},
				function (err, department) {
					if (err) {
						return res.send({error: 'Server error'});
					} else {
						res.send(department);
					}
				});
		}
	});
}

function updateDepartment(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			DepartmentsModel.findOne({
				id: req.body.id
			}, function (err, department) {
				if (err) {
					return res.send({error: err.message});
				} else {
					department.name = req.body.name;
					department.address = req.body.address;
					department.phone = req.body.phone;
					department.description = req.body.description;
					department.sum = req.body.sum;

					department.save(function (err) {
						if (err) {
							return res.send({error: 'Server error'});
						} else {
							res.send(department);
						}
					});
				}	
			});
		}
	});
}

function deleteDepartment(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			DepartmentsModel.remove({
				"id": req.body.id
			}, 
			function (err) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					console.log('Department with id: ', req.body.id, ' was removed');
					res.send('Department with id: ' + req.body.id + ' was removed');
				}
			});
		}
	});
}

//------------------------------------------------------------------------ Projects
function getProjects(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			return ProjectsModel.find(function (err, projects) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					res.send(projects);
				}
			});
		}
	});
}

function addProject(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
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
					} else {
						res.send(project);
					}
				});
		}
	});
}

function updateProject(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			ProjectsModel.findOne({
				id: req.body.id
			}, function (err, project) {
				if (err) {
					return res.send({error: err.message});
				} else {
					project.name = req.body.name;
					project.address = req.body.address;
					project.phone = req.body.phone;
					project.description = req.body.description;
					project.sum = req.body.sum;

					project.save(function (err) {
						if (err) {
							return res.send({error: 'Server error'});
						} else {
							res.send(project);
						}
					});
				}	
			});
		}
	});
}

function deleteProject(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			ProjectsModel.remove({
				"id": req.body.id
			}, 
			function (err) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					console.log('Project with id: ', req.body.id, ' was removed');
					res.send('Project with id: ' + req.body.id + ' was removed');
				}
			});
		}
	});
}

//------------------------------------------------------------------------ Goods
function getGoods(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			return GoodsModel.find(function (err, goods) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					res.send(goods);
				}
			});
		}
	});
}

function addGood(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			GoodsModel.create({
					id: req.body.id,
					name: req.body.name,
					price: req.body.price,
					quantity: req.body.quantity,
					store: req.body.store,
					description: req.body.description
				},
				function (err, good) {
					if (err) {
						return res.send({error: 'Server error'});
					} else {
						res.send(good);
					}
				});
		}
	});
}

function updateGood(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			GoodsModel.findOne({
				id: req.body.id
			}, function (err, good) {
				if (err) {
					return res.send({error: err.message});
				} else {
					good.name = req.body.name;
					good.address = req.body.address;
					good.price = req.body.price;
					good.quantity = req.body.quantity;
					good.store = req.body.store;
					good.description = req.body.description;

					good.save(function (err) {
						if (err) {
							return res.send({error: 'Server error'});
						} else {
							res.send(good);
						}
					});
				}	
			});
		}
	});
}

function deleteGood(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			GoodsModel.remove({
				"id": req.body.id
			}, 
			function (err) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					console.log('Good with id: ', req.body.id, ' was removed');
					res.send('Good with id: ' + req.body.id + ' was removed');
				}
			});
		}
	});
}

//------------------------------------------------------------------------ Inputs
function getInputs(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			return InputsModel.find(function (err, inputs) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					res.send(inputs);
				}
			});
		}
	});
}

function addInput(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			InputsModel.create({
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
	});	
}

function deleteInput(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
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
	});				
}

//------------------------------------------------------------------------ Outputs
function getOutputs(req, res) {
	var agent = req.headers.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			return OutputsModel.find(function (err, outputs) {
				if (err) {
					return res.send({error: 'Server error'});
				} else {
					res.send(outputs);
				}
			});
		}
	});
}

function addOutput(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
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
	});	
}

function deleteOutput(req, res) {
	var agent = req.body.authorization;
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
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
	});				
}
