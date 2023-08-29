const express = require('express');
const router = express.Router();


const homeController = require('../controller/homecontroller');
router.get('/',homeController.home);

router.post('/add', homeController.add);

router.get('/status/:habit_id&:date_id&:mark', homeController.status);

router.get('/delete/:id', homeController.deleteTask);

router.use('/api', require('./api'));

// console.log('router is loaded')
module.exports = router;