
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongodb = require('mongodb');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/register', routes.register);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

/*
 * Global variables
 */
db = mongodb.connect("mongodb://localhost:27017/kodmardenDB", function (err, db) {
    console.log("connection to kodmardenDB succeeded!");
    test();
});

app.post('/register', function (req, res) {
    User_Register(req);
});

function test() {
    console.log(db);
}

function User_Register(req) {
    var register_input = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        personal_number: req.body.personal_number,
        university_card_number: req.body.university_card_number,
        email: req.body.email,
        phone_number: req.body.phone_number,
        user_name: req.body.user_name,
        password: req.body.password
    }

    if (Minimum_Input_Is_Valid(register_input) === true) {
        Database_Register_Insert();
        console.log("Insert into database complete")
    }
    else {
        console.log(db)
        console.log("Need more input to form");
    }

}

function Database_Register_Insert(register_input) {
    db.collection("member").insert([
        {
            firstname: register_input.first_name,
            lastname: register_input.last_name,
            kiosk: [
                {
                    username: register_input.user_name,
                    password: register_input.password,
                    balance: 0
                }
            ],
            personalnumber: register_input.personal_number,
            unicardnumber: register_input.university_card_number,
            email: register_input.email,
            phone: register_input.phone_number,
            registerdate: new Date()
        }
    ])
}

// if firstname, lastname, username or password isn't present false is returned. 
// Also if both phonenumber and email ain't present false is returned. 
function Minimum_Input_Is_Valid(register_input) {
    
    if (register_input.first_name == '' || register_input.last_name == '' ||
        register_input.user_name == '' || register_input.password == '') {
        return false;
    }
    
    if (register_input.email == '' && register_input.phone_number == '') {
        return false;
    }

    return true;
}


