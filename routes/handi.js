const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const user = require("../model/schema");
const User = require('../model/schema');

router.get('/:username', (req, res) => {
    console.log("working");
})




router.post('/:username/hisdata', (req, res) => {
    var flag = false;
    const userty = req.params.username;
    const useri_msg = req.body.desc;
    const user_amount = req.body.amount;



    user.findOne({ email: userty })
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


            User.findOneAndUpdate({ email: userty }, {
                totalamount: user_totalamount,
                income: user_income,
                expense: user_expence,
                $push: { messages: { history_messages: useri_msg, history_amounts: user_amount } }
            }, { new: true }, (err, data) => {
                if (err) console.log(err);
                else res.render('main', { user_name: data.email, t_am: data.totalamount, t_in: data.income, t_ex: data.expense, t_msg: data.messages });


            })





        })
        .catch((err) => {
            console.log(err);
        })


})

router.post('/:username/savedata', (req, res) => {
    res.send("the save data requst made")
})



router.post('/:username/logout', (req, res) => {
    res.send("the log out called");
})




module.exports = router;