var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var models = require('../models');

module.exports = {
    register: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        var surname = req.body.surname;
        
        if (email == null || password == null || name == null || surname == null) {
            return res.status(400).json({ 'error' : 'missing parameters' });
        }

        // TODO Verif
/*
       models.User.findOne({
            attributes: ['email'],
            where: { email: email}
        })
        .then(function(userFound){ 
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    var newUser = models.User.create({
                        email: email,
                        password: password,
                        name: name,
                        surname: surname,
                        isAdmin: 0,
                        password: bcryptedPassword
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error' : 'cannot add user'});
                    });
                });
            } else {
                return res.status(409).json({ 'error' : 'user already exist'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error' : 'unable to verify user'});
        });*/
    },
    login: function(req, res) {
        
    }
}