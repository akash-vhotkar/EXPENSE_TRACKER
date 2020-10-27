const express = require('express');
const User = require('../model/schema')

const bcypt = require('bcrypt');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('login')
})


router.post('/login', (req, res) => {
    const logerrorm = [];
    const username = req.body.email;
    const passworld = req.body.passworld;
    if (!username) {
        logerrorm.push({ msg: "plaese enter the username" })
    }
    if (String.toString(passworld).length < 6) {
        logerrorm.push({ msg: "plase enter correct passworld" })
    }


    if (logerrorm.length > 0) {
        res.render('login', { logerrorm })
    }
    else {
        User.findOne({ email: username })
            .then((user) => {
                bcypt.compare(passworld, user.password2, (err, ismatch) => {
                    if (err) console.log(err);
                    else res.render('main', { user_name: user.email, t_am: user.totalamount, t_in: user.income, t_ex: user.expense, t_msg: user.messages })
                })
            })
            .catch((err) => {
                console.log(err);
                logerrorm.push({ msg: "user does not exists please register" })
                res.render('login', { logerrorm })
            })

    }
})

router.get('/register', (req, res) => {
    res.render('register', { data: false });
})
router.post('/register', (req, res) => {
    let errors = [];
    const data = {
        name: req.body.name,
        email: req.body.email,
        password1: req.body.password1,
        password2: req.body.password2,
        totalamount: 0,
        expense: 0,
        income: 0,
        messages: []
    }
    if (!data.name || !data.email) {
        errors.push({ msg: "please fill all field" });
    }
    if (req.body.password1 != req.body.password2) {
        errors.push({ msg: "  please fill correst passworld" })
    }
    if (data.password1 < 6) {
        errors.push({ msg: " please fill passworlfd length which is grreater thean  six charater" })
    }


    if (errors.length > 0) {
        res.render('register', {
            errors
        });

    }
    else {
        //validate user

        User.findOne({ email: data.email })
            .then((user) => {
                if (user) {
                    errors.push({ msg: "user already exists" })
                    res.render('register', { errors })
                }
                else {
                    bcypt.genSalt(10, (err, salt) => {
                        bcypt.hash(data.password1, salt, (err, hash) => {
                            if (err) throw err;
                            data.password1 = hash;
                            data.password2 = hash;
                            User.create(data)
                                .then(() => {
                                    console.log("data was inserted");
                                    errors.push({ msg: "registeration succefully " })
                                    res.render('login', { errors: errors });
                                })
                                .catch(() => {
                                    console.log("data was not inserted");
                                })
                        })
                    })

                }
            })
            .catch((err) => console.log(err))


    }

})

module.exports = router;







