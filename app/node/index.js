var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser({limit: '50mb'}));

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on 3000');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/build/index.html');
    //res.send('It is just API Server...');
});

//app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//------------------------------------------------------------------------
//------------------------------------------------------------------------
var fileItems = require('./file-items').Items;

app.get('/file/api/items/getAll', fileItems.getAll);
app.get('/file/api/items/get', fileItems.getFirstHundred);
app.get('/file/api/items/findId/:id', fileItems.findById);
app.get('/file/api/items/findByName/:name', fileItems.findByName);
app.get('/file/api/items/findByRegNum/:name', fileItems.findByRegNum);
app.post('/file/api/items/add', fileItems.addItem);
app.post('/file/api/items/delete', fileItems.removeItem);
app.post('/file/api/items/update', fileItems.updateItem);

//------------------------------------------------------------------------
var mongoItems = require('./mongo-items').Items;

app.get('/api/items/getAll', mongoItems.getItems);
app.get('/api/items/get', mongoItems.getFirstHundred);
app.get('/api/items/find/:id', mongoItems.findItem);
app.post('/api/items/find', mongoItems.findPostItem);
app.get('/api/items/findByName/:name', mongoItems.findByName);
app.get('/api/items/findByRegNum/:name', mongoItems.findByRegNum);
app.get('/api/items/edit/:id/:name', mongoItems.editItem);
app.post('/api/items/edit/', mongoItems.editPostItem);
app.post('/api/items/update', mongoItems.updateItem);
app.post('/api/items/add', mongoItems.addItem);
app.post('/api/items/save', mongoItems.saveItem);
app.get('/api/items/drop', mongoItems.removeAllItems);
app.post('/api/items/drop', mongoItems.removeAllItems);
app.post('/api/items/delete', mongoItems.removeItem);

//------------------------------------------------------------------------
//------------------------------------------------------------------------
var fileUsers = require('./file-users').Users;

app.get('/file/api/users/get', fileUsers.getAll);
app.get('/file/api/users/findId/:id', fileUsers.findById);
app.get('/file/api/users/findByName/:name', fileUsers.findByName);
app.post('/file/api/users/add', fileUsers.addItem);
app.post('/file/api/users/delete', fileUsers.removeItem);
app.post('/file/api/users/update', fileUsers.updateItem);

//------------------------------------------------------------------------
var mongoUsers = require('./mongo-users').Users;

app.get('/api/users/get', mongoUsers.getUsers);
app.get('/api/users/findByName/:name', mongoUsers.findByName);
app.post('/api/users/find', mongoUsers.findPostUser);
app.post('/api/users/update', mongoUsers.updateUser);
app.post('/api/users/add', mongoUsers.addUser);
app.get('/api/users/drop', mongoUsers.removeAllUsers);
app.post('/api/users/delete', mongoUsers.removeUser);

//------------------------------------------------------------------------
//------------------------------------------------------------------------
var fileAudit = require('./file-audit').Audit;

app.get('/file/api/audit/get', fileAudit.getAll);
app.post('/file/api/audit/add', fileAudit.addItem);

//------------------------------------------------------------------------
var mongoAudit = require('./mongo-audit').Audit;

app.get('/api/audit/get', mongoAudit.getAudit);
app.post('/api/audit/add', mongoAudit.addAudit);