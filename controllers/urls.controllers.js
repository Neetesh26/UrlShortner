const urlModel = require('../model/Url.Schema')
const shortid = require('shortid');


const createUrl = async (req, res) => {
    try {
        const urlData = req.body;
        if (!urlData.url) {
            return res.status(404).json({
                message: 'url is required'
            })
        }
        const updatedData = await urlModel.create({
            shortId: shortid(),
            redirectUrl: urlData.url,
            urlVisited: []
        })
        // return res.status(200).json({ message: 'successfully generated short url', shortid: updatedData.shortId })
        return res.render('home', { 
            shortId: updatedData.shortId 
        });
    } catch (error) {
        console.log(error);

    }
}


const getUrlsHandler = async (req, res) => {
    try {
        const shortIdFromParams = req.params.shortid;
        console.log("Incoming shortid:", shortIdFromParams);

        if (!shortIdFromParams) {
            return res.status(400).json({ msg: 'params not found' });
        }

        const urlData = await urlModel.findOneAndUpdate(
    { shortId: shortIdFromParams },
    {
        $push: {
            urlVisited: {
                timestamp: new Date()
            }
        }
    },
    { new: true }
);

        console.log("Fetched document:", urlData);

           if (!urlData) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        let redirectUrl = urlData.redirectUrl;

        if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
            redirectUrl = 'https://' + redirectUrl;
        }

        return res.redirect(redirectUrl);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

const anlyticsHandler = async (req, res) => {
    try {
        const shortIdFromParams = req.params.shortid;

        if (!shortIdFromParams) {
            return res.status(400).json({ msg: 'params not found' });
        }
        const urlData = await urlModel.findOne({ shortId: shortIdFromParams });
        if (!urlData) {
            return res.status(404).json({ message: 'Short URL not found' });
        }
        console.log(urlData);
        
        return res.status(200).json({ message: 'Analytics data fetched successfully' ,  totalClicks: urlData.urlVisited.length,
            visits: urlData.urlVisited});
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}

module.exports = {
    createUrl, getUrlsHandler,anlyticsHandler
};