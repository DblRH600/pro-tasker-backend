import express from 'express'
import { authMiddleware as protect } from '../utils/auth.js'
import {
  createProject,
  updateProject,
  getAllProjects,
  getProjectById,
  deleteProject
} from '../controllers/projectController.js'

const router = express.Router()

// ====== middleware to protect all routes ==== //
router.use(protect)

// =========== routes =========== //
/**
 * POST api/projects
 * @description route for project creation
 */
router.post('/', createProject)

/**
 * PUT api/projects/:id
 * @description route for updating project data
 */
router.put('/:id', updateProject)

/**
 * GET api/projects
 * @description route for retrieving all projects
 */
router.get('/', getAllProjects)

/**
 * GET api/projects/:id
 * @description route for retrieving a project by id
 */
router.get('/:id', getProjectById)

/**
 * DELETE api/projects/:id
 * @description route for project deletion
 */
router.delete('/:id', deleteProject)

export default router