const express = require('express');
const router = express.Router();
const generalTools = require('../../tools/general-tools');
const {
    loginPage,
    loggedInUser,
} = require("../../services/auth/login");

router.get('/', generalTools.sessionChecker, loginPage)
router.post('/', loggedInUser);

module.exports = router;