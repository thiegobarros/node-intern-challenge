const router = require('express').Router();

const MongoClient = require('mongodb', { useNewUrlParser: true }).MongoClient;
const url = "mongodb://localhost:27017/";

router.post('/add', (req, res) => {
    const {id} = req.body;
    const {nome} = req.body;

    var fullUrl = 'POST ' + req.protocol + '://' + req.get('host') + req.originalUrl + " " + req.body;
    console.log(fullUrl);
  
    if (!id || !nome) {
      res.sendStatus(400);
    }

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){

        if(err) throw err;
        var dbo = db.db("mydb");
        var myobj = {id: id, nome: nome};
        
        dbo.collection("books").insertOne(myobj, function(){

            if(err) throw err;
            console.log("insert ok");
            db.close();
        });
    });
  
    res.json({inseriu: id + ' - ' + nome});
});

router.get('/get/:id', (req, res) => {
    const {id} = req.params;

    var fullUrl = 'GET ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){

        if(err) throw err;
        var dbo = db.db("mydb");
        var query = {id: id};
        
        dbo.collection("books").find(query).toArray(function(err, result){

            if(err) throw err;
            console.log(result);

            if(result.length == 0){
                res.json({message: 'não existe!'});
            }else{
                res.json(result);
            }

            db.close();
        });
    });

});

module.exports = router;