const express = require('express');
const router = express.Router();


const {
    registerPage,
    createUser,

} = require("../../services/auth/register");






console.log(123432);
router.get('/', registerPage);
router.post('/', createUser);





module.exports = router;
