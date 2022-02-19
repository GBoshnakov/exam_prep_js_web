const { isUser } = require('../middlewares/guards');
const { getPostById, deleteById } = require('../services/post');

const router = require('express').Router();

router.get('/delete/:id', isUser(), del);

async function del(req, res) {
    const id = req.params.id;
    const post = await getPostById(id);

    if (post.author._id != req.session.user._id) {
        return res.redirect('/login');
    }
    try {
        //TODO
        await deleteById(id);
        res.redirect('/allPosts');
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
}


module.exports = router;