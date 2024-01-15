const router = require('express').Router();
const userController = require('./controllers/user');
const authMiddleware = require('./middlewares/authentication');

router.get('/', (req, res) => {res.send('Routed!')})
router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;