const { Router } = require('express');
const router = Router();
const { checkAuth, checkRole } = require('../middleware/authentication');
const {
    getusers,
    generateTokenToUser,
    createuser,
    updateuser,
    deleteuser,
    getUser,
    sendLinkRestoreUserPassword,
    restoreUserPassword
} = require('../controllers/usersController');

router.route('/login')
    .post(generateTokenToUser)

router.route('/signup')
    .post(createuser)

router.route('/reset')
    .post(sendLinkRestoreUserPassword)
    .put(checkAuth, restoreUserPassword)

router.route('/')
    .get(checkAuth, checkRole(['ADMIN']), getusers)

router.route('/:email')
    .get(checkAuth, checkRole(['ADMIN']), getUser)
    .delete(checkAuth, checkRole(['ADMIN']), deleteuser)
    .put(checkAuth, checkRole(['ADMIN']), updateuser)


module.exports = router;