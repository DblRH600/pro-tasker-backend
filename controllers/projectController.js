import Project from '../models/Project.js'

// create a new project
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      user: req.user._id,
      projectDueDate: req.body.projectDueDate,
      status: req.body.status
    })
    res.status(201).json(project)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message })
  }
}

// update project information
export const updateProject = async (req, res) => {
  try {
    const projectUpdate = await Project.findById(req.params.id)

    if (!projectUpdate) {
      return res
        .status(404)
        .json({ message: 'Project not found under this id' })
    }

    if (!projectUpdate.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'Updates to this project are authorized by the user' })
    }

    // apply updates to project
    projectUpdate.name = req.body.name
    projectUpdate.description = req.body.description
    projectUpdate.projectDueDate = req.body.projectDueDate
    projectUpdate.status = req.body.status

    const updated = await projectUpdate.save()

    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

// find all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id })
      .populate('user', 'username')
      .populate('tasks')
    res.json(projects)
  } catch (error) {
    console.error(error)
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

// find a single project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    if (!project.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'User not Authorized to view project' })
    }

    res.json(project)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

// delete project
export const deleteProject = async (req, res) => {
  try {
    const projectDelete = await Project.findByIdAndDelete(req.params.id)
    if (!projectDelete) {
      return res
        .status(404)
        .json({ message: 'Project not found under this id' })
    }

    if (!projectDelete.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'User is not authorized to delete project content' })
    }

    await projectDelete.deleteOne()
    res.json({ message: 'Project has been deleted!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
