module.exports = function (app, models) {
  var fs = require("fs");
  app.post("/item", function (req, res, next) {
    console.log(req.body);
    if (req.body.userId && req.body.productId && req.body.name && req.body.description && req.body.adress
    && req.body.location && req.body.photo && req.body.price && req.body.unitId && req.body.quantity) {
      var Item = models.Item;
      var id = null;
      if (req.body.id) {
        id = req.body.id;
      }
      Item.create({
        "id": id,
        "idProduct": req.body.productId,
        "name": req.body.name,
        "description": req.body.description,
        "adress": req.body.adress,
        "location": req.body.location,
        "price": req.body.price,
        "unitId": req.body.unitId,
        "quantity": req.body.quantity,
        "idUser": req.body.userId
      }).then(function (result) {
        console.log(result);
        var filePath=null;
        if (req.body.photo != null) {
          filePath = "ressources/itemPhotos/" + result.id + "/";
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
          }

          var extension = req.body.photo.name.split('.');
          var oldpath = req.body.photo.path;
          var newpath = filePath + "1." + extension[extension.length - 1];

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
          "code": 0,
          "id": result.id,
          "name": result.name
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          "code": 2,
          "message": "Sequelize error",
          "error": err
        });
      });
    } else {
      res.json({
        "code": 1,
        "message": "Missing required parameters"
      });
    }
  });
}