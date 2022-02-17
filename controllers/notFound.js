const router = require('express').Router();

router.get('*', notFound);

function notFound(req, res) {
    res.render('404', { title: 'Page not found' })
}

module.exports = router;