const express = require('express');
const router = express.Router();

const homeController = require('../../controller/api/homeController')

router.get('/', homeController.home);

router.post('/add', homeController.add);

router.get('/status/:habit_id&:date_id&:mark', homeController.status);

router.get('/delete/', homeController.deleteTask);

module.exports = router;