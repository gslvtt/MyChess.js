const router = require('express').Router();
const userController = require('./controllers/user');
const commentController = require('./controllers/comment')
const authMiddleware = require('./middlewares/authentication');

router.get('/', (req, res) => {res.send('Routed!')})
router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);
router.get('/me/getComments', authMiddleware, commentController.getUserComments);
router.post('/me/addComment', authMiddleware, commentController.addUserComment);
router.post('/me/editComment', authMiddleware, commentController.editUserComment);
// COULD MAKE IT A DELETE REQUEST WITH :id
router.post('/me/deleteComment', authMiddleware, commentController.deleteUserComment);

module.exports = router;