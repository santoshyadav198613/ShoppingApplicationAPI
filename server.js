const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

var MongoClient = require('mongodb').MongoClient;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'anothertoken,Accept,token ,Content-Type ');
    next();
});

MongoClient.connect('mongodb://localhost:27017/ShoppingApplicationDB', function (err, db) {
    if (err) throw err

    //   db.collection('mammals').find().toArray(function (err, result) {
    //     if (err) throw err

    //     console.log(result)
    //   })

    app.get('/product', function (req, res) {
        db.collection('product').find().toArray(function (err, data) {
            res.send(data);
        })
    })


    app.post('/product', function (req, res) {
        console.log(req.body);
        db.collection('product').insert(req.body).then(function (result) {
            console.log(result);
            res.send(result);
        })
    })


    app.put('/product', function (req, res) {
        res.send('this is put method');
    })


})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});