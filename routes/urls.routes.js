const express = require('express')
const urlModel = require('../model/Url.Schema')
const router = express.Router()
const { createUrl , getUrlsHandler ,anlyticsHandler} = require('../controllers/urls.controllers')

router.post('/', createUrl)
router.get('/updatedget/:shortid', getUrlsHandler)
router.get('/analytics/:shortid', anlyticsHandler)

module.exports = router