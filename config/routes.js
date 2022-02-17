const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const createController = require('../controllers/create');
const allPostsController = require('../controllers/allPosts');
const detailsController = require('../controllers/details');
const deleteController = require('../controllers/delete');
const notFoundController = require('../controllers/notFound');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(createController);
    app.use(allPostsController);
    app.use(detailsController);
    app.use(deleteController);
    app.use(notFoundController);
}