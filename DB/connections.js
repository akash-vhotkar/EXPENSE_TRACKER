const mongoos = require('mongoose');
const url = require('../config/key').mongourl;


const connectdb = mongoos.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("database connectec succefully");
})
    .catch((err) => {
        console.log(err);

    })
module.exports = connectdb;