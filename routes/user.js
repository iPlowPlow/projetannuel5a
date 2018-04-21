var bcrypt = require("bcrypt-nodejs");

// Code : 
// 0 : OK
// 1 : missing params
// 2 : sequelize error
// 3 : not found, wrong pwd, ...
// 4 : Unauthorized
// 5 : account not validated 

module.exports = function(app, models) {

	//CREATE USER
    app.post("/user", function(req, res, next) {
        if (req.body.loginUser
            && req.body.emailUser && req.body.passwordUser) {

            var User = models.User;
            User.create({
                "loginUser" : req.body.loginUser,
                "emailUser" : req.body.emailUser,
                "passwordUser" : req.body.passwordUser,
                "saltUser" : req.body.saltUser,
                "mailValidationUser" : false,
                "validationCodeUser" : req.body.validationCodeUser,
                "typeUser" : "user"
            }).then(function(result){
                res.json({
                    "code" : 0,
                    "loginUser" : result.loginUser,
                    "emailUser" : result.emailUser
                });
            }).catch(function(err){
                res.json({
                    "code" : 2,
                    "message" : "Sequelize error",
                    "error" : err
                });
            });
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });

	//GET ALL USER
    app.get("/users", function(req, res, next) {
        
        var User = models.User;
        var request = {
            attributes: ["loginUser", "emailUser", "typeUser"],  
        };
        User.findAll(request).then(function(result){
            if(result){
                res.json(result);
            }else{
                res.json({
                    "code" : 3,
                    "message" : "User not found"
                });
            }
        });
    
    });

	//pas fini
	//GET USER BY ID
    app.get("/user/findById", function(req, res, next) {
        if (req.body.idUser){
            var User = models.User;
            var request = {
                where: {
                    idUser : req.body.idUser
                }
            };
            User.find(request).then(function(result) {
                if (result){
                    res.json({
                        "code" : 0,
                        "loginUser" : result.loginUser
                    });
                } else {
                    res.json({
                        "code" : 3,
                        "message" : "User not found"
                    });
                }
            });
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });
    
    app.get("/user/findForValidation", function(req, res, next) {
        if (req.body.validationCodeUser){
            var User = models.User;
            var request = {
                where: {
                    validationCodeUser : req.body.validationCodeUser
                }
            };
            User.find(request).then(function(result) {
                if (result){
                    var loginUser = result.loginUser
                    var attributes = {}
                    attributes.mailValidationUser = true;
                    attributes.validationCodeUser = ""
                    var request2 = {
                        where: {
                            loginUser : loginUser
                        }
                    };

                    User.update(attributes, request2).then(function (results) {
                        res.json({
                            "code":0,
                            "message":"Validated user account"
                        });
                    }).catch(function (err) {
                        res.json({
                            "code": 2,
                            "message": "Sequelize error",
                            "error": err
                        });
                    });

                } else {
                    res.json({
                        "code" : 3,
                        "message" : "User not found"
                    });
                }
            });
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });
	
	   app.get("/user/find", function (req, res, next) {
        if (req.body.loginUser) {
            var User = models.User;
            var request = {
                attributes: ["loginUser", "passwordUser", "emailUser", "typeUser"],
                where: {
                    loginUser: req.body.loginUser
                }
            };
            User.find(request).then(function (result) {
                if (result) {
                    res.json({
                        "code": 0,
                        "idUser": result.idUser,
                        "loginUser": result.loginUser,
                        "emailUser": result.emailUser,
                        "typeUser": result.typeUser
                    });
                } else {
                    res.json({
                        "code": 3,
                        "message": "User not found"
                    });
                }
            });
        } else {
            res.json({
                "code": 1,
                "message": "Missing required parameters"
            });
        }
    });
	
	//GET USER BY Login
    app.get("/user/findByLogin", function(req, res, next) {
        if (req.body.loginUser){
            var User = models.User;
            var request = {
                where: {
                    loginUser : req.body.loginUser
                }
            };
            User.find(request).then(function(result) {
                if (result){
                    res.json({
                        "code" : 0,
                        "loginUser" : result.loginUser,
                        
                    });
                } else {
                    res.json({
                        "code" : 3,
                        "message" : "User not found with this login"
                    });
                }
            });
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });


    //GET USER BY Login
    app.get("/user/findByEmail", function(req, res, next) {
        if (req.body.emailUser){
            var User = models.User;
            var request = {
                where: {
                    emailUser : req.body.emailUser
                }
            };
            User.find(request).then(function(result) {
                if (result){
                    res.json({
                        "code" : 0,
                        "emailUser" : result.emailUser,
                        
                    });
                } else {
                    res.json({
                        "code" : 3,
                        "message" : "User not found with this email"
                    });
                }
            });
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });

    app.get("/user/checkValidate", function(req, res, next) {
        if (req.body.loginUser){
            var User = models.User;
            var request = {
                where: {
                    loginUser : req.body.loginUser
                }
            };
            User.find(request).then(function(result) {
                if (result){          
                    if(result.mailValidationUser == false){
                        res.json({
                            "code" : 5,
                            "message" : "User account not validated"
                        });
                    }else{
                        res.json({
                            "code" : 0,   
                        });
                    }
                    
                } else {
                    res.json({
                        "code" : 3,
                        "message" : "User not found with this login"
                    });
                }
            });
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });

	//AUTH
    app.get("/user/auth", function(req, res, next) {
        if (req.body.loginUser && req.body.passwordUser) {
            var User = models.User;
            var request = {
                attributes: ["idUser", "loginUser", "passwordUser", "emailUser", "typeUser", "saltUser"],
                where: {
                    loginUser : req.body.loginUser
                }
            };
            User.find(request).then(function(result){
                if(result){
                    
                    if(bcrypt.compareSync(req.body.passwordUser+result.saltUser, result.passwordUser)){
                        res.json({
                            "code" : 0,
                            "idUser" : result.idUser,
                            "loginUser" : result.loginUser,
                            "emailUser" : result.emailUser,
                            "typeUser" : result.typeUser
                        });
                    }else{
                        res.json({
                            "code" : 3,
                            "message" : "Wrong pwd"
                        });
                    }
                }else{
                    res.json({
                        "code" : 3,
                        "message" : "User not found"
                    });
                }
            }).catch(function(err){
                res.json({
                    "code" : 2,
                    "message" : "Sequelize error",
                    "error" : err
                });
            });
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });
	
    app.delete("/deleteuser/:id", function (req, res, next) {  
        var u1 = new user();
        if (req.params.id) {
            u1.delete(req.params.id, function (result) {
                res.status(200);
                res.json({
                    "user":"deleted"
                });
            });
        }
    });
}
