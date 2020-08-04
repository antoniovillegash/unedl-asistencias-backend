const { Router } = require('express');
const router = Router();
const { checkAuth, checkRole } = require('../middleware/authentication');
const {
    createAttendance,
} = require('../controllers/attendanceController')



router.route('/')
    .post(checkAuth, createAttendance)



module.exports = router;