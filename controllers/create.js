const router = require('express').Router();
const mapErrors = require('../util/mappers');

router.get('/create', createGet);
router.post('/create', createPost);

function createGet(req, res) {
    res.render('create', { title: 'Create Page' })
}

//TODO 
async function createPost(req, res) {
    try {

    } catch (error) {
        console.log(error);
        res.render('create', { title: 'Create Page', errors: mapErrors(error) })
    }
}

module.exports = router;