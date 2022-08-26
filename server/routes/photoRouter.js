const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const photoController = require('../controllers/photoController')


router.post('/upload', authMiddleware, photoController.uploadPhoto)
router.get('/list_photos/', authMiddleware, photoController.getAllUserPhotos)
router.get('/:id', authMiddleware, photoController.getOne)

module.exports = router
