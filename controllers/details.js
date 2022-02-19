const { getPostById } = require('../services/post');
const { mapPost } = require('../util/mappers');
const { isGuest } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/details/:id', detailsGet);

async function detailsGet(req, res) {
    const id = req.params.id;
    const post = mapPost(await getPostById(id));
    console.log(post.votes)
    if (req.session.user) {
        res.locals.hasUser = true;
        if (req.session.user._id == post.author._id) {
            res.locals.isAuthor = true;
        } else {
            post.votes.forEach(element => {
                if (element._id == req.session.user._id) {
                    res.locals.hasVoted = true;
                }
            });
            // res.locals.hasVoted = post.votes.includes(req.session.user._id);
        }
    }
    console.log(res.locals.hasVoted, res.locals.isAuthor)
    res.render('details', { title: `Details - ${post.title}`, post })
}

module.exports = router;