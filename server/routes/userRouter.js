const Router = require('express')
const router = new Router()
const userControllers = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)
router.get('/auth', authMiddleware, userControllers.check)

module.exports = router
