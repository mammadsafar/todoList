const path = require('path');
const fs = require('fs');
const Task = require(path.join(__dirname, '../models/task'));
const bcrypt = require('bcrypt');
const generalTools = require('../tools/general-tools');
const multer = require('multer');







const showDashboard = (req, res) => {
    console.log(100);
    res.render('Dashboard');

}
// ? ---------------------------------< get all task  >---------------------------- 
const getTask = (req, res) => {
    console.log("get data");
    Task.find({
        owner: req.session.user._id
    }).sort({
        lastUpdate: -1
    }).exec((err, user) => {
        console.log(err);
        console.log("err");
        if (err) {
            return res.redirect(url.format({
                pathname: "/api/auth/registerPage",
                status: 500,
                query: {
                    "msg": "Server Error :("
                }
            }))
        }
        if (!user) {
            return res.redirect(url.format({
                pathname: "/api/auth/registerPage",
                status: 400,
                query: {
                    "msg": 'Any User Not Exist :('
                }
            }));
        };


        res.json(user)


    })
}

// ? ---------------------------------< add task User >---------------------------- 
const add = (req, res) => {


    const task = new Task({
        text: req.body.text,
        owner: req.session.user._id,
    });


    task.save((err) => {
        console.log(err);
        if (err) {
            if (err.code === 11000) {
                return res.status(400).send("Duplicate item!")
            }
            if (
                err.message.includes('username') ||
                err.message.includes('required')
            ) {
                return res.status(400).send("Server Error :(");
            }

        }else{

            res.status(200).json({})
        }
    })
    // res.send("<script type='text/javascript'>window.location.reload();</script>");
    // res.redirect('/dashboard')

}
// ? ---------------------------------< done task Pass >---------------------------- 
const done = (req, res) => {

    date = Date.now()
    console.log(date);
    Task.findOneAndUpdate({
        _id: req.params.id,
    }, {
        done: true,
        lastUpdate: date
    }, {
        new: true
    }, (err, task) => {
        console.log(err);
        if (err) return res.status(500).json({
            msg: "Server Error :)"
        });

        res.send("ok");





    })
}

// ? ---------------------------------< logOut User >---------------------------- 
const logOut = (req, res) => {

    req.session.destroy(function (err) {
        if (err) return res.status(500).send('Server Error :(')
    });
    res.redirect('/login');

}
// ? ---------------------------------< deleteTask task User >---------------------------- 
const deleteTask = (req, res) => {

    Task.findOneAndDelete({
        _id: req.params.id,
    }, (err, user) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });

        res.send("ok");
    })

}





module.exports = {
    showDashboard,
    getTask,
    add,
    done,
    deleteTask,
    logOut,

}