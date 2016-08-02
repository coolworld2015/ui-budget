var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds015760.mlab.com:15760/ui-budget');
//mongoose.connect('mongodb://localhost:27017/ui-budget');
//mongoose.connect('mongodb://admin:admin@ds053728.mongolab.com:53728/warehouse'); //TODO mongolab for mlab is possible

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Error from mongoDB: ' + err.message);
});

db.once('open', function callback() {
    console.log('Connected to mongoDB');
});

var Schema = mongoose.Schema;

//---------------------------------------------------------------------------------------------
var Departments = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    description: {type: String, required: true},
    sum: {type: String, required: true}
});

var DepartmentsModel = mongoose.model('Departments', Departments);
module.exports.DepartmentsModel = DepartmentsModel;

//---------------------------------------------------------------------------------------------
var Projects = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    description: {type: String, required: true},
    sum: {type: String, required: true}
});

var ProjectsModel = mongoose.model('Projects', Projects);
module.exports.ProjectsModel = ProjectsModel;

//---------------------------------------------------------------------------------------------
var Employees = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    description: {type: String, required: true},
    sum: {type: String, required: true}
});

var EmployeesModel = mongoose.model('Employees', Employees);
module.exports.EmployeesModel = EmployeesModel;

//---------------------------------------------------------------------------------------------
var Clients = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    description: {type: String, required: true},
    sum: {type: String, required: true}
});

var ClientsModel = mongoose.model('Clients', Clients);
module.exports.ClientsModel = ClientsModel;

//---------------------------------------------------------------------------------------------
var Goods = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true},
    store: {type: Boolean, required: true},
    description: {type: String, required: true}
});

var GoodsModel = mongoose.model('Goods', Goods);
module.exports.GoodsModel = GoodsModel;

//---------------------------------------------------------------------------------------------
var Users = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    pass: {type: String, required: true},
    description: {type: String, required: true}
});

var UsersModel = mongoose.model('Users', Users);
module.exports.UsersModel = UsersModel;

//---------------------------------------------------------------------------------------------
var Audit = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    date: {type: String, required: true},
    ip: {type: String, required: true},
    description: {type: String, required: true}
});

var AuditModel = mongoose.model('Audit', Audit);
module.exports.AuditModel = AuditModel;

//---------------------------------------------------------------------------------------------
var Inputs = new Schema({
    id: {type: String, required: true},
    invoiceID: {type: String, required: true},
    project: {type: String, required: true},
    projectID: {type: String, required: true},

    department: {type: String, required: true},
    departmentID: {type: String, required: true},
    employee: {type: String, required: true},
    employeeID: {type: String, required: true},
    product: {type: String, required: true},
    productID: {type: String, required: true},
    quantity: {type: String, required: true},
    price: {type: String, required: true},

    date: {type: String, required: true},
    total: {type: String, required: true},
    description: {type: String, required: true}
});

var InputsModel = mongoose.model('Inputs', Inputs);
module.exports.InputsModel = InputsModel;

//---------------------------------------------------------------------------------------------
var Outputs = new Schema({
    id: {type: String, required: true},
    number: {type: String, required: true},
    client: {type: String, required: true},
    clientID: {type: String, required: true},
    date: {type: String, required: true},
    total: {type: String, required: true},
    description: {type: String, required: true}
});

var OutputsModel = mongoose.model('Outputs', Outputs);
module.exports.OutputsModel = OutputsModel;

//---------------------------------------------------------------------------------------------
var InvoiceIn = new Schema({
    id: {type: String, required: true},
    invoiceID: {type: String, required: true},
    goods: {type: String, required: true},
    goodsID: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true},
    total: {type: String, required: true},
    description: {type: String, required: true}
});

var InvoiceInModel = mongoose.model('InvoiceIn', InvoiceIn);
module.exports.InvoiceInModel = InvoiceInModel;

//---------------------------------------------------------------------------------------------
var InvoiceOut = new Schema({
    id: {type: String, required: true},
    invoiceID: {type: String, required: true},
    goods: {type: String, required: true},
    goodsID: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true},
    total: {type: String, required: true},
    description: {type: String, required: true}
});

var InvoiceOutModel = mongoose.model('InvoiceOut', InvoiceOut);
module.exports.InvoiceOutModel = InvoiceOutModel;