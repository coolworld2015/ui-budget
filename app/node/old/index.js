var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on 3000');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/build/index.html');
    //res.send('It is just API Server...');
});

app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//------------------------------------------------------------------------
var Departments = require('./departments').Departments;

app.get('/api/departments/get', Departments.getDepartments);

app.get('/api/departments/find/:id', Departments.findDepartment);
app.post('/api/departments/find', Departments.findPostDepartment);

app.get('/api/departments/edit/:id/:name', Departments.editDepartment);
app.post('/api/departments/edit/', Departments.editPostDepartment);
app.post('/api/departments/update', Departments.updateDepartment);

app.post('/api/departments/add', Departments.addDepartment);
app.post('/api/departments/save', Departments.saveDepartment);

app.get('/api/departments/drop', Departments.removeAllDepartments);
app.post('/api/departments/drop', Departments.removeAllDepartments);
app.post('/api/departments/delete', Departments.removeDepartment);

//------------------------------------------------------------------------
var Projects = require('./projects').Projects;

app.get('/api/projects/get', Projects.getProjects);

app.get('/api/projects/find/:id', Projects.findProject);
app.post('/api/projects/find', Projects.findPostProject);

app.get('/api/projects/edit/:id/:name', Projects.editProject);
app.post('/api/projects/edit/', Projects.editPostProject);
app.post('/api/projects/update', Projects.updateProject);

app.post('/api/projects/add', Projects.addProject);
app.post('/api/projects/save', Projects.saveProject);

app.get('/api/projects/drop', Projects.removeAllProjects);
app.post('/api/projects/drop', Projects.removeAllProjects);
app.post('/api/projects/delete', Projects.removeProject);

//------------------------------------------------------------------------
var Employees = require('./employees').Employees;

app.get('/api/employees/get', Employees.getEmployees);

app.get('/api/employees/find/:id', Employees.findEmployee);
app.post('/api/employees/find', Employees.findPostEmployee);

app.get('/api/employees/edit/:id/:name', Employees.editEmployee);
app.post('/api/employees/edit/', Employees.editPostEmployee);
app.post('/api/employees/update', Employees.updateEmployee);

app.post('/api/employees/add', Employees.addEmployee);
app.post('/api/employees/save', Employees.saveEmployee);

app.get('/api/employees/drop', Employees.removeAllEmployees);
app.post('/api/employees/drop', Employees.removeAllEmployees);
app.post('/api/employees/delete', Employees.removeEmployee);

//------------------------------------------------------------------------
var Clients = require('./clients').Clients;

app.get('/api/clients/get', Clients.getClients);

app.get('/api/clients/find/:id', Clients.findClient);
app.post('/api/clients/find', Clients.findPostClient);

app.get('/api/clients/edit/:id/:name', Clients.editClient);
app.post('/api/clients/edit/', Clients.editPostClient);
app.post('/api/clients/update', Clients.updateClient);

app.post('/api/clients/add', Clients.addClient);
app.post('/api/clients/save', Clients.saveClient);

app.get('/api/clients/drop', Clients.removeAllClients);
app.post('/api/clients/drop', Clients.removeAllClients);
app.post('/api/clients/delete', Clients.removeClient);

//------------------------------------------------------------------------
var Goods = require('./goods').Goods;

app.get('/api/goods/get', Goods.getGoods);
app.post('/api/goods/find', Goods.findPostItem);

app.post('/api/goods/add', Goods.addItem);
app.post('/api/goods/update', Goods.updateItem);
app.post('/api/goods/delete', Goods.removesItem);

app.get('/api/goods/drop', Goods.removeAllGoods);

//------------------------------------------------------------------------
var Users = require('./users').Users;

app.get('/api/users/get', Users.getUsers);
app.post('/api/users/find', Users.findPostUser);
app.get('/api/users/findByName/:name', Users.findByName);

app.post('/api/users/add', Users.addUser);
app.post('/api/users/update', Users.updateUser);
app.post('/api/users/delete', Users.removeUser);

app.get('/api/users/drop', Users.removeAllUsers);

//------------------------------------------------------------------------
var mongoAudit = require('./audit').Audit;

app.get('/api/audit/get', mongoAudit.getAudit);
app.post('/api/audit/add', mongoAudit.addAudit);

//------------------------------------------------------------------------
var Inputs = require('./inputs').Inputs;

app.get('/api/inputs/get', Inputs.getInputs);
app.post('/api/inputs/find', Inputs.findPostInput);

app.post('/api/inputs/add', Inputs.addInput);
app.post('/api/inputs/update', Inputs.updateInput);
app.post('/api/inputs/delete', Inputs.removeInput);

app.get('/api/inputs/drop', Inputs.removeAllInputs);

//------------------------------------------------------------------------
var Outputs = require('./outputs').Outputs;

app.get('/api/outputs/get', Outputs.getOutputs);
app.post('/api/outputs/find', Outputs.findPostOutput);

app.post('/api/outputs/add', Outputs.addOutput);
app.post('/api/outputs/update', Outputs.updateOutput);
app.post('/api/outputs/delete', Outputs.removeOutput);

app.get('/api/outputs/drop', Outputs.removeAllOutputs);

//------------------------------------------------------------------------
var InvoiceIn = require('./invoicein').InvoiceIn;

app.get('/api/invoicein/get', InvoiceIn.getInvoices);
app.post('/api/invoicein/find', InvoiceIn.findPostInvoice);

app.post('/api/invoicein/add', InvoiceIn.addInvoice);
app.post('/api/invoicein/update', InvoiceIn.updateInvoice);
app.post('/api/invoicein/delete', InvoiceIn.removeInvoice);

app.get('/api/invoicein/drop', InvoiceIn.removeAllInvoices);

//------------------------------------------------------------------------
var InvoiceOut = require('./invoiceout').InvoiceOut;

app.get('/api/invoiceout/get', InvoiceOut.getInvoices);
app.post('/api/invoiceout/find', InvoiceOut.findPostInvoice);

app.post('/api/invoiceout/add', InvoiceOut.addInvoice);
app.post('/api/invoiceout/update', InvoiceOut.updateInvoice);
app.post('/api/invoiceout/delete', InvoiceOut.removeInvoice);

app.get('/api/invoiceout/drop', InvoiceOut.removeAllInvoices);