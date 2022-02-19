const router = require('express').Router();
const { voteById } = require('../services/post');
const { mapErrors } = require('../util/mappers');

router.get('/vote/:id/:type', getVote);


async function getVote(req, res) {
    const id = req.params.id;
    const voteValue = req.params.type == 'upvote' ? 1 : -1;

    try {
        await voteById(id, req.session.user._id, voteValue);

        res.redirect('/details/' + id);
    } catch (errors) {
        console.log(errors);
        res.render('details', { title: 'Details', errors: mapErrors(errors) })
    }
}


module.exports = router;