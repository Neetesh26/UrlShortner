const express = require('express')
const urlModel = require('../model/Url.Schema')
const router = express.Router()

router.get('/', async (req, res) => {
    const allUrls = await urlModel.find({})
   return  res.render('home', { allUrls });
})  
router.get('/url', async (req, res) => {
    const allUrls = await urlModel.find({})
   return  res.render('home', { allUrls });
})  
module.exports = router