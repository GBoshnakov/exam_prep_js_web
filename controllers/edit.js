const { isUser } = require('../middlewares/guards');
const { getPostById, editPostById } = require('../services/post');
const { mapPost, mapErrors } = require('../util/mappers');
const router = require('express').Router();

router.get('/edit/:id', isUser(), editGet);
router.post('/edit/:id', isUser(), editPost)


async function editGet(req, res) {
    const id = req.params.id;
    const post = mapPost(await getPostById(id));

    if (req.session.user._id != post.author._id) {
        return res.redirect('/login');
    }

    res.render('edit', { title: `Edit - ${post.title}`, post })
}

async function editPost(req, res) {
    const id = req.params.id;

    const existing = mapPost(await getPostById(id));

    if (req.session.user._id != existing.author._id) {
        return res.redirect('/login');
    }
    const post = {
        _id: id,
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description
    }

    try {
        await editPostById(id, post);
        res.redirect('/details/' + id)

    } catch (errors) {
        console.log(errors);
        res.render('edit', { title: `Edit - ${post.title}`, post, errors: mapErrors(errors) });
    }
}

module.exports = router;