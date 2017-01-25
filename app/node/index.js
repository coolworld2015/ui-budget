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
						res.send(token); // Send TOKEN here !!!
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
