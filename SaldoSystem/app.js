
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
var dbConnection = false;
var db = mongodb.connect("mongodb://localhost:27017/kodmardenDB", function (err, db) {
    dbConnection = true;
    console.log("connection to database succeeded!");
});

function User_Register() {
    var register_input = [];
    register_input[0] = document.getElementById("first_name");
    register_input[1] = document.getElementById("last_name");
    register_input[2] = document.getElementById("personal_number");
    register_input[3] = document.getElementById("university_card_number");
    register_input[4] = document.getElementById("email");
    register_input[5] = document.getElementById("phone_number");
    register_input[6] = document.getElementById("user_name");
    register_input[7] = docuemnt.getElementById("password");
    
    console.log(register_input[0]);
    if (Minimum_Input_Is_Valid(register_input) === true) {
        db.collection("member").insert([
            {
                firstname: register_input[0].Text
            }
        ])
    }
}

function Check_If_Minimum_Input_Is_Valid(register_input) {
    


    return true;
}
/*db.collection("member").insert([
        {
            firstname: "Anton",
            surname: "Oden",
            kiosk: [
                {
                    username: "untslusk",
                    password: "ruttenko",
                    balance: 5000,
                }
            ],
            personalnumber: "9309228436",
            unicardnumber: "003057",
            email: "antonoden@hotmail.com",
            phone: "0768119444",
            adress: "Jakthornsgatan 76 65632 Karlstad"
        }
    ]);*/


