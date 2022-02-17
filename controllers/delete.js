const router = require('express').Router();

router.post('/delete', del);

function del(req, res) {
    const id = req.params.id;

    try {
        //TODO
        
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
}


module.exports = router;