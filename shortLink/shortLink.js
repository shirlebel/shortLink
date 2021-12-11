const shortid = require('shortid');

const { shortToOriginalMap } = require('../utils/maps');
const { originalToShortMap } = require('../utils/maps');

module.exports = function (app, basePath) {
    //gets an original url and returns the short url
    app.get('/encode', (req, res) => {
        try {
            const { originalUrl } = req.query;
            const shortCheck = originalToShortMap.get(originalUrl);

            //if already exists - return existing shortend url
            if (shortCheck) {
                res.json(`${basePath}/${shortCheck}`);
            }
            else {
                //generate short url
                const shortUrl = shortid.generate();

                //save data for both original and shortend url
                originalToShortMap.set(originalUrl, shortUrl);
                shortToOriginalMap.set(shortUrl, originalUrl);

                res.json(`${basePath}/${shortUrl}`);
            }
        } catch (err) {
            return res.status(500).send(res);
        }
    })

    //gets a short url and returns the original url
    app.get('/decode', (req, res) => {
        try {
            let { shortUrl } = req.query;

            //remove the basepath
            shortUrl = shortUrl.replace(`${basePath}/`, "");
            res.json(shortToOriginalMap.get(shortUrl));
        } catch (err) {
            return res.status(500).send(res);
        }
    })
}