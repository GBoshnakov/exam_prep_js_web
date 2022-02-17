const router = require('express').Router();

router.get('/', homeGet);

function homeGet(req, res) {
    res.render('home', { title: 'Home Page' })
}

module.exports = router;