const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const user = require("../model/schema");
const User = require('../model/schema');
const { session } = require('passport');


router.get('/:username', (req, res) => {
    if (req.session.name) {
        User.findOne({ name: req.params.username }).then((user) => {
            res.render('main', { user_name: user.name, t_am: user.totalamount, t_in: user.income, t_ex: user.expense, t_msg: user.messages });


        })
            .catch(err => {
                console.log(err);

            })
    }
    else {
        res.render('login')
    }

})


router.post('/:username/hisdata', (req, res) => {
    if (req.session.name) {


        const userty = req.params.username;
        const useri_msg = req.body.desc;
        const user_amount = req.body.amount;




        user.findOne({ name: userty })
            .then((user) => {

                var user_totalamount = user.totalamount;
                var user_income = user.income;
                var user_expence = user.expense;
                var user_msg = user.msg;

                if (user_amount < 0) {
                    user_totalamount -= Math.abs(user_amount);
                    user_expence += Math.abs(user_amount);
                }
                else {
                    user_totalamount += Math.abs(user_amount);
                    user_income += Math.abs(user_amount)
                }


                User.findOneAndUpdate({ name: userty }, {
                    totalamount: user_totalamount,
                    income: user_income,
                    expense: user_expence,
                    $push: { messages: { history_messages: useri_msg, history_amounts: user_amount } }
                }, { new: true }, (err, data) => {
                    if (err) console.log(err);
                    else res.render('main', { user_name: data.name, t_am: data.totalamount, t_in: data.income, t_ex: data.expense, t_msg: data.messages });


                })





            })
            .catch((err) => {
                console.log(err);
            })
    }
    else {
        let errors = [];
        errors.push({ msg: "please login again" })

        res.render('login', errors);
    }


})


router.post('/:username/logout', (req, res) => {
    delete req.session.name;
    res.redirect("/users/login")
})




module.exports = router;