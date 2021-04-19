const express = require('express');
const router = express.Router();

// import controller
const { requireSignin } = require('../controllers/authcontroller');
const { getText, insertLessons,getLessons,getOneLessons,updateStats } = require('../controllers/common-controller');
const { readController, updateController } = require('../controllers/usercontroller');

router.get('/user/:id', requireSignin, readController);
router.put('/user/update', requireSignin, updateController);
router.get('/stats',requireSignin, readController);

router.post('/lessons',insertLessons)
router.get('/lessons',getLessons);
router.get('/lessons/:id',getOneLessons,updateStats);
router.put('/lessons/:id',updateStats);
// router.get('/typing-test', updateStats);


module.exports = router;