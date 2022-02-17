const router = require('express').Router();

router.get('/details', detailsGet);

function detailsGet(req, res) {
    res.render('details', { title: 'Details Page' })
}

module.exports = router;