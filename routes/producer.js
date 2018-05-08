module.exports = function(app, models, TokenUtils) {
    var fs = require("fs");

    //CREATE Producer
    app.post("/producer", function(req, res, next) {
        if (req.body.loginUser && req.body.lastNameProducer && req.body.firstNameProducer && req.body.emailProducer && req.body.phoneProducer && req.body.birthProducer && req.body.sexProducer && req.body.addressProducer && req.body.cityProducer && req.body.cpProducer && req.body.token) {
            var Producer = models.Producer;
            var User = models.User;
            var idUser = null;
            TokenUtils.findIdUser(req.body.loginUser).then( function(result) { 
                idUser = result.idUser;
                  
                if (TokenUtils.verifSimpleToken(req.body.token, "kukjhifksd489745dsf87d79+62dsfAD_-=", result.idUser) == false) {
                    res.json({
                        "code" : 6,
                        "message" : "Failed to authenticate token"
                    });
                    
                } else {
                    

                    Producer.create({
                        "idUserProducer" : idUser,
                        "lastNameProducer" : req.body.lastNameProducer,
                        "firstNameProducer" : req.body.firstNameProducer,
                        "emailProducer" : req.body.eMailProducer,
                        "phoneProducer" : req.body.phoneProducer,
                        "birthProducer" : req.body.birthProducer,
                        "sexProducer" : req.body.sexProducer,
                        "addressProducer" : req.body.addressProducer,
                        "cityProducer" : req.body.cityProducer,
                        "cpProducer" : req.body.cpProducer,
                        "descriptionProducer" : req.body.descriptionProducer,
                    }).then(function(result){
                        var request = {
                            "where": {
                                loginUser: req.body.loginUser
                            }
                        };
                        var attributes = {};
                        attributes.typeUser = "producer"
                        User

                        User.update(attributes, request).then(function (results) {                      
                        }).catch(function (err) {
                           
                        });
                        var filePath=null;
                        if(req.body.avatarProducer!=null){
                            filePath = "ressources/producerAvatar/"+idUser+"/";
                            if (!fs.existsSync(filePath)) {
                                fs.mkdirSync(filePath)
                            }
                            
                            var extension = req.body.avatarProducer.name.split('.');
                            var oldpath = req.body.avatarProducer.path;
                            var newpath = filePath+ "avatar."+extension[extension.length-1];
    
                            fs.readFile(oldpath, function (err, data) {
                                console.log('File read!');
                    
                                // Write the file
                                fs.writeFile(newpath, data, function (err) {
                                    console.log('File written!');
                                });
                    
                                // Delete the file
                                fs.unlink(oldpath, function (err) {
                                    console.log('File deleted!');
                                });
                            });
                        }

                        res.json({
                            "code" : 0,
                            "message" : "producer"
                        });
                    }).catch(function(err){             
                        res.json({
                            "code" : 2,
                            "message" : "Sequelize error"
                            
                        });
                    });
                }
            }).catch(function (err) {
                console.log(err)
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                });
            })  ;
            
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });


}