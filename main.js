// imposting the data from the file
const url = require('./config/key').mongourl;
require('./model/schema')
const express = require('express');
const app = express();
const path = require('path')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');



// setting up the middlewaew in the 
mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({ extended: false }))
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("database connectec succefully");
})
    .catch((err) => {
        console.log(err);

    })


app.use('/users/tracker', require('./routes/handi'))
app.use('/users', require('./routes/users'))
const port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log("server was listining on port no 4000");
})
