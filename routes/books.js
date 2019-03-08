const router = require('express').Router();

const MongoClient = require('mongodb', { useNewUrlParser: true }).MongoClient;
const url = "mongodb://localhost:27017/";

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'urls.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );

router.post('/add', (req, res) => {
    const {id} = req.body;
    const {nome} = req.body;

    //make url
    var fullUrl = 'POST ' + req.protocol + '://' + req.get('host') + req.originalUrl + " " + JSON.stringify(req.body);
    console.log(fullUrl);

    //send url to log
    log.info(fullUrl);
  
    //verify id and nome
    if (!id || !nome) {
      res.sendStatus(400);
    }

    //db connect
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

    //Make URL
    var fullUrl = 'GET ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);

    //Send URL to LOG
    log.info(fullUrl);

    //db connect
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){

        if(err) throw err;
        var dbo = db.db("mydb");
        var query = {id: id};
        
        dbo.collection("books").find(query).toArray(function(err, result){

            if(err) throw err;
            console.log(result);

            //verify result
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