const express= require('express')
const router=express.Router()
const {createCompany, getList} = require ('../controllers/companyController')
const {createAd, getAdList, search} = require('../controllers/adController')



router.post('/addCompany', createCompany)
router.get('/list', getList)

router.post('/adSaved', createAd)
router.get('/adList', getAdList)
router.get('/search', search)

router.get('/testing', function (_req, res) {
    res.status(200).send({status: true, message: " Hello Testing API is Live"})})
router.all('/**', function (_req, res) {
    res.status(404).send({status: false, message: " Requested API not Available"})})

module.exports=router; 