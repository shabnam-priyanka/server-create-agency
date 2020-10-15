const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json())
app.use(cors());
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const uri = `mongodb+srv://creative-agency:LYcv18MbUdCKeV7P@cluster0.egr2g.mongodb.net/creativeAgency?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const formCollection = client.db("creativeAgency").collection("shabnam");
    const iconCollection = client.db("creativeAgency").collection("icon");
    const serviceCollection = client.db("creativeAgency").collection("service");
    const orderCollection = client.db("creativeAgency").collection("addOrder");

    const clientFeedback = client.db("creativeAgency").collection("feedback");
    //const clientReview = client.db("creativeAgency").collection("review");
    // const clientStatus = client.db("creativeAgency").collection("status");



    //this is for sending icons 
    app.get('/icon', (req, res) => {
        iconCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    //this is to send all  service to frontend 
    app.get('/allService', (req, res) => {
        serviceCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    //this is to send feedback data to frontend
    app.get('/feedback', (req, res) => {
        clientFeedback.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })



    // this is to send data from service details component 
    app.post('/addOrder', (req, res) => {
        const registrationsDetails = req.body;
        orderCollection.insertOne(registrationsDetails)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result)
            })
    })

    // this is to send review data to backend from review component
    app.post('/addReview', (req, res) => {
        const review = req.body;
        clientFeedback.insertOne(review)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result)
            })
    })
    


    // find with email
    app.get('/orderstatus', (req, res) => {
        orderCollection.find({ email: req.query.email })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    
    console.log('connected');
});
app.listen(process.env.PORT)