import express from 'express'
import { authMiddleware as protect } from '../utils/auth.js'
import {
  createTask,
  updateTask,
  getTasksByProject,
  deleteTask
} from '../controllers/taskController.js'

const router = express.Router()

// ====== middleware to protect all routes ==== //
router.use(protect)

// =========== routes =========== //
/**
 * POST api/projects/:projectId/tasks
 * @description task creation route
 */
router.post('/projects/:projectId/tasks', createTask)

/**
 * PUT api/tasks/:taskId
 * @description route to update task by id
 */
router.put('/tasks/:taskId', updateTask)

/**
 * GET api/projects/:projectId/task
 * @description route to retrieve tasks by project id
 */
router.get('/projects/:projectId/tasks', getTasksByProject)

/**
 * DELETE api/tasks/:taskId
 * @description route to delete tasks
 */
router.delete('/tasks/:taskId', deleteTask)


export default router