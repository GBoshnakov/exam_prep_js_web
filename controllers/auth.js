const router = require('express').Router();
const { register, login } = require('../services/user');
const mapErrors = require('../util/mappers');
const { isGuest, isUser } = require('../middlewares/guards');


router.get('/register', isGuest(), registerGet);
router.post('/register', isGuest(), registerPost);

router.get('/login', isGuest(), loginGet);
router.post('/login', isGuest(), loginPost);

router.get('/logout', isUser(), logout);

function registerGet(req, res) {
    res.render('register', { title: 'Register Page' });
}

//TODO check form names, actions, methods
async function registerPost(req, res) {
    try {
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        }
        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements

    } catch (error) {
        console.log(error)
        res.render('register', { title: 'Register Page', data: { username: req.body.username }, errors: mapErrors(error) });
    }
}

function loginGet(req, res) {
    res.render('login', { title: 'Login Page' })
}

async function loginPost(req, res) {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements
    } catch (error) {
        console.log(error)
        res.render('login', { title: 'Login Page', data: { username: req.body.username }, errors: mapErrors(error) });

    }

}

function logout(req, res) {
    delete req.session.user;
    res.redirect('/'); //TODO check redirect requirements
}

module.exports = router;