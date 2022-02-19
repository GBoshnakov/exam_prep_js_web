const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { getOwnerPosts } = require('../services/post');
const { mapPost } = require('../util/mappers');

router.get('/myPosts',isUser(), postsGet);

//TODO check names, service
async function postsGet(req, res) {
    const user = req.session.user;
    
    const posts = (await getOwnerPosts(user._id)).map(mapPost);

    res.render('my-posts', { title: `Posts from ${user.firstName} ${user.lastName}`, posts });
}

module.exports = router;