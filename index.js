const express = require('express');
const configExpress = require('./config/express');
const initDb = require('./config/database');
const configRoutes = require('./config/routes');

start();
async function start() {
    await initDb();

    const app = express();
    configExpress(app);
    configRoutes(app);

    app.all('*', (req, res) => {
        res.render('404')
    })

    app.listen(3000, () => console.log('Server running on port 3000'));
}