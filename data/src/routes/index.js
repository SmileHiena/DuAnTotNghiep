const user = require('./user')


const initRouter = (app) => {
   
    app.use('/api/v1/user', user)

   return app.use('/', (req, res) => {
        res.send('Hello World! haoi nè ba')
    })
}

module.exports = initRouter