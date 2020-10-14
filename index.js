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
const uri =`mongodb+srv://creative-agency:LYcv18MbUdCKeV7P@cluster0.egr2g.mongodb.net/creativeAgency?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const formCollection = client.db("creativeAgency").collection("shabnam");
    const iconCollention = client.db("creativeAgency").collection("icon");
    const serviceCollention = client.db("creativeAgency").collection("service");
    const clientFeedback = client.db("creativeAgency").collection("feedback");
    const clientReview = client.db("creativeAgency").collection("review");
    const clientStatus = client.db("creativeAgency").collection("status");



//this is for sending icons 
    app.get('/icon', (req, res) => {
        iconCollention.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    //this is to send all  service to frontend 
    app.get('/service', (req, res) => {
        serviceCollention.find({})
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

    // this is for order status NOT WORKING
    app.get('/status', (req, res) => {
        clientStatus.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    // this is to send data from service details component 
    app.post('/addService', (req, res) => {
        const registrationsDetails = req.body;
        formCollection.insertOne(registrationsDetails)
          .then(result => {
            console.log(result.insertedCount);
            res.send(result)
          })
      })

      // this is to send review data to backend from review component
      app.post('/review', (req, res) => {
        const review = req.body;
        clientFeedback.insertOne(review)
          .then(result => {
            console.log(result.insertedCount);
            res.send(result)
          })
      })
    // app.get('/register/:id', (req, res) => {
    //     eventsCollection.find({_id: ObjectId(req.params.id)})
    //         .toArray((err, documents) => {
    //             res.send(documents[0])
    //         })
    // })
    app.get('/orderstatus', (req, res) => {
        formCollection.find({ email: req.query.email })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    // // function for getting the data..
    // app.get(/allUsers, (req, res) => {
    //     registrations.find({})
    //         .toArray((err, documents) => {
    //             res.send(documents)
    //         })
    // })
    // app.post('/AddRegistrations', (req, res) => {
    //     const registrationsDetails = req.body;
    //     registrations.insertOne(registrationsDetails)
    //         .then(result => {
    //             console.log(result.insertedCount);
    //             res.send(result.insertedCount > 0)
    //         })
    // })
    // app.delete('/deleteRegistration/:id', (req, res) => {
    //     registrations.deleteOne({ _id: ObjectId(req.params.id) })
    //         .then(result => {
    //             console.log(result, 'tui are nai');
    //         })
    // })
    // app.delete('/deleteUser/:id', (req, res) => {
    //     registrations.deleteOne({ _id: ObjectId(req.params.id) })
    //         .then(result => {
    //             res.send(result.deletedCount > 0);
    //         })
    // })
    // app.post('/AddEvent', (req, res) => {
    //     const eventDetails = req.body;
    //     eventsCollection.insertOne(eventDetails)
    //         .then(result => {
    //             console.log(result.insertedCount);
    //             res.send(result.insertedCount > 0)
    //         })
    // })
    // // it will show on terminal when database is connected successfully
    console.log('connected');
});
app.listen(process.env.PORT)