const express = require('express');
const path = require('path');
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/gymsub', { useNewUrlParser: true })

const app = express();
const port = 9000;


var gymSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    age: String,
    payment: String,
    date: String,
    batch: String
});


var Enroll = mongoose.model('Enroll', gymSchema);


app.use(express.urlencoded());
app.use('/static', express.static('static'));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, '/form.html'));
});




app.post('/form', (req,res)=>{
    var myData = new Enroll(req.body);
    myData.save().then(()=>{
        res.send("You have been enrolled in our fitness club!!!")
    }).catch(()=>{
        res.status(400).send("Sorry for inconvience but your data was't uploaded successfully.... Try again!!")
    })
});




app.listen(port, () =>{
    console.log(`The application is successfully running on port ${port}`);
})
