const express = require('express')
const router = express.Router()
const {loginUser,registerUser,currentUser} = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.post('/current',validateToken,currentUser)

module.exports = router