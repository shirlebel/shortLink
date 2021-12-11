const { shortToOriginalMap } = require('../utils/maps');

module.exports = function (app) {
    //routing from short url to original urls
    app.get('/:urlShortId', async (req, res) => {
        try {
            const { urlShortId } = req.params;
            console.log("---urlShortId", urlShortId)
            console.log("---shortToOriginalMap", shortToOriginalMap)
            const originalUrl = shortToOriginalMap.get(urlShortId);

            //if url exists - redirect to original url
            if (originalUrl) {
                return res.redirect(originalUrl);
            }
            else {
                res.status(404).json('Short url does not exists');
            }
        } catch (err) {
            return res.status(500).send(res);
        }
    });
}