const router = require('express').Router();
const { getPosts } = require('../services/post');
const { mapPost } = require('../util/mappers');

router.get('/allPosts', postsGet);

//TODO check names, service
async function postsGet(req, res) {
    const posts = (await getPosts()).map(mapPost);

    res.render('all-posts', { title: 'All Posts Page', posts });
}

module.exports = router;