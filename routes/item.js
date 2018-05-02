module.exports = function (app, models) {
  app.post("/item", function (req, res, next) {
    console.log(req.body);
    if (req.body.userId && req.body.productId && req.body.name && req.body.description 
    && req.body.location && req.body.photo && req.body.price && req.body.unitId && req.body.quantity) {
      var Item = models.Item;
      var id = null;
      if (req.body.idProduct) {
        id = req.body.idProduct;
      }
      Item.create({
        "id": id,
        "idProduit": req.body.productId,
        "name": req.body.name,
        "description": req.body.description,
        "location": req.body.location,
        "photoURL": req.body.photo,
        "price": req.body.price,
        "unitId": req.body.unitId,
        "quantity": req.body.quantity,
        "idUser": req.body.userId
      }).then(function (result) {
        console.log(result);
        res.json({
          "code": 0,
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