const router = require('express').Router();
const mapErrors = require('../util/mappers');

router.get('/allPosts', createGet);
router.post('/allPosts', createPost);

function createGet(req, res) {
    res.render('all-posts', { title: 'All Posts Page' })
}

//TODO 
async function createPost(req, res) {
    try {

    } catch (error) {
        console.log(error);
        res.render('all-posts', { title: 'All Posts Page', errors: mapErrors(error) })
    }
}

module.exports = router;