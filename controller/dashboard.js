const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools');

const {
    showDashboard,
    getTask,
    deleteTask,
    done,
    add,
    logOut,

} = require("../services/dashboard");

router.get('/', showDashboard)

router.post('/add', add);

router.get('/getTask', getTask);

router.delete('/:id', deleteTask);

router.put('/:id', done);

router.get('/logOut', logOut)
module.exports = router;