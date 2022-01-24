const express = require('express');
const path = require('path');
const fs = require('fs');
let app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactdance', { useNewUrlParser: true, useUnifiedTopology: true });
let port = 800;

const ContactSchema = new mongoose.Schema({
    name: String,
    phome: String,
    emal: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', ContactSchema);


app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved");
    }).catch(() => {
        res.status(400).send('Item has not been saved');
    })
    //res.status(200).render('contact.pug');
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});