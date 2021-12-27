const {signupHandler,signinHandler,check, getSellersHandler,getUserHandler,logOutHandler} = require('./auth/controller/authController')
const {createAppointmentHandler,getAppointmentHandler,deleteAppointmentHandler,updateAppointmentStatusHandler,updateAppointmentHandler} = require('./api/appoimentController')
const basic = require('./auth/middleware/basic')
const bearer = require('./auth/middleware/bearer')
const sellerCheck = require('./auth/middleware/acl')
const express = require('express');
const router = express.Router()

router.post('/signup', signupHandler)
router.post('/signin', basic,signinHandler)
router.get('/check', bearer,check )
router.get('/getSeller', bearer,getSellersHandler)
router.get('/getUser', bearer, getUserHandler)
router.get('/logout', bearer,logOutHandler)


router.post('/createAppointment', bearer, createAppointmentHandler)
router.get('/getAppointment/:id',bearer, getAppointmentHandler)
router.get('/getAppointment',bearer, getAppointmentHandler)
router.put('/updateAppointment', bearer, updateAppointmentHandler)
router.put('/updateAppointmentStatus', bearer,sellerCheck, updateAppointmentStatusHandler)
router.delete('/deleteAppointment', bearer, deleteAppointmentHandler)
module.exports = router;