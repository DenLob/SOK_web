const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const photoRouter = require('./photoRouter')

router.use('/user', userRouter)
router.use('/photo', photoRouter)

module.exports = router
