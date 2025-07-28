import express from 'express'
import adminOnly from '../middleware/adminOnly.js'
import {
  registerUser,
  loginUser,
  deleteUser,
  adminDashboard
} from '../controllers/userController.js'

const router = express.Router()

/**
 * POST api/users/register
 * @description route to create new user
 */
router.post('/register', registerUser)

/**
 * POST api/users/login
 * @description authentication & token route
 */
router.post('/login', loginUser)

/**
 * GET api/users/dashboard
 * @description admin route, will have access to pro-tasker dashboard
 */
router.get('/dashboard', adminOnly, adminDashboard)

/**
 * PUT api/users/:id
 * @description route for users to update their information
 * @abstract if user tries to change role to admin, site admin is notified to confirm access
 */
// Mice -to- Have Route

/**
 * DELETE api/users/delete
 * @description route used by admin to delete user accounts
 */
router.delete('/:id', adminOnly, deleteUser)

export default router
