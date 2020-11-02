// imposting the data from the file
const url = require('./config/key').mongourl;
const User = require('./model/schema');
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const { parse } = require('path');
const schema = mongoose.Schema;
const objectid = schema.objectid;


// setting up the middlewaew in the 
mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "keyvalue",
    resave: true,
    saveUninitialized: true
}))

app.use(bodyparser.urlencoded({ extended: false }))
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("database connectec succefully");
})
    .catch((err) => {
        console.log(err);

    })


app.use('/users/tracker', require('./routes/trackerroute'))
app.use('/users', require('./routes/authusers'))



app.get('/deletedata', (req, res) => {
    var id = req.query.id;
    var username = req.query.username;
    var truedeletevalue = 0;


    User.findOne({ name: username.substring(1, username.length) })
        .then((user) => {


            let newtotal = user.totalamount;
            let newincome = user.income;
            let newexpense = user.expense;

            let deleteamount = user.messages.filter((i) => i._id == id)


            deleteamount.forEach(element => {
                truedeletevalue = element.history_amounts;
            });


            if (truedeletevalue < 0) {
                newtotal -= parseInt(truedeletevalue);
                newexpense = parseInt(newexpense) - Math.abs(truedeletevalue);
            }
            else {
                newtotal -= parseInt(truedeletevalue);
                newincome -= parseInt(truedeletevalue);
            }



            User.findOneAndUpdate({ name: username.substring(1, username.length) }, {
                totalamount: newtotal,
                income: newincome,
                expense: newexpense,
                messages: user.messages.filter((i) => i._id != id)

            }, { new: true }, (err, data) => {
                if (err) console.log(err);

            })




        })
        .catch((err) => {
            console.log(err);

        })




})
const port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log("server was listining on port no 4000");
})




