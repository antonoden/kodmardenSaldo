﻿
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Saldosystem', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear() });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear()  });
};

exports.register = function (req, res) {
    res.render('register', { title: 'Register', year: new Date().getFullYear() });
}
