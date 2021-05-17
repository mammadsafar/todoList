const express = require('express');
const router = express.Router();
const register = require('../controller/auth/register')
const login = require('../controller/auth/login')
const Dashboard = require('../controller/dashboard');
// const userData = require('../controller/userData');
// const dashboard = require('../controller/dashboard');
// const article = require('../controller/article');
// const public = require('../controller/public');
// const admin = require('../controller/admin');
const generalTools = require('../tools/general-tools');


// ? ---------------------------------< Register >---------------------------- 
router.use('/register', register);
// ? ---------------------------------< Login >---------------------------- 
router.use('/login', generalTools.sessionChecker, login);

// ? ---------------------------------< Dashboard >---------------------------- 
router.use('/dashboard', generalTools.loginChecker, Dashboard);
// // ? ---------------------------------< ger data user >---------------------------- 
// router.use('/userData', userData);
// // ? ---------------------------------< article >---------------------------- 
// router.use('/article', generalTools.loginChecker, article);
// // router.use('/article', article);
// // ? ---------------------------------< All article >---------------------------- 
// router.use('/all', public);

// // ? ---------------------------------< admin >---------------------------- 
// router.use('/owner', generalTools.loginChecker, admin);

// router.get('/', (req, res) => {
//   res.render('home')
// });
// router.get('/home', (req, res) => {
//   res.render('home')
// });
// router.get('/about', (req, res) => {
//   res.render('about')
// });
// router.get('/contact', (req, res) => {
//   res.render('article/newArticle')
// });




module.exports = router;