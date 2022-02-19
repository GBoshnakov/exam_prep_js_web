const router = require('express').Router();
const { mapErrors } = require('../util/mappers');
const { isUser } = require('../middlewares/guards');
const { createNewPost } = require('../services/post');


router.get('/create', isUser(), createGet);
router.post('/create', isUser(), createPost);

function createGet(req, res) {
    res.render('create', { title: 'Create Page' })
}

//TODO 
async function createPost(req, res) {
    const userId = req.session.user._id;
    const data = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: userId
    }

    try {
        await createNewPost(data);
        res.redirect('/allPosts');

    } catch (error) {
        console.log(error);
        res.render('create', { title: 'Create Page', errors: mapErrors(error), data })
    }
}

module.exports = router;