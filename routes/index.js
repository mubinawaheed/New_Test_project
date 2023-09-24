const routes = require('./stockRoutes')
module.exports = app => {
    app.get('/', (req, res) => {
        return res.status(200).json("Welcome to node server")
    });

    app.use('/stocks', routes)
    app.use(function (req, res, next) {
        return res.status(404).json("Route does not exist")
    });
}