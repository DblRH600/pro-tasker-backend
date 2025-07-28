import Task from '../models/Task.js'
import Project from '../models/Project.js'

// create a new task to add to project
export const createTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)

    if (!project) {
      return res.status(404).json({ message: 'Project cannot be found' })
    }

    if (!project.user.equals(req.user._id)) {
      return res.status(404).json({
        message: 'User is not permitted to update tasks for this project'
      })
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'To Do',
      project: project._id,
      user: req.user._id
    })

    console.log('Created Task', task)
    project.tasks.push(task._id)
    await project.save()
    res.status(201).json(task)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message })
  }
}

// update task information
export const updateTask = async (req, res) => {
  try {
    const taskUpdate = await Task.findById(req.params.taskId).populate(
      'project'
    )

    if (!taskUpdate) {
      return res
        .status(404)
        .json({ message: 'Task not found under this id for this project' })
    }

    if (!taskUpdate.project.user.equals(req.user._id)) {
      return res.status(403).json({
        message: 'User is not authorized to update tasks on this project'
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

// find all tasks by project
export const getTasksByProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)

    if (!project) {
      return res.status(404).json({ message: 'Project cannot be found' })
    }

    if (!project.user.equals(req.user._id)) {
      return res.status(404).json({
        message: 'User is not permitted to view the tasks for this project'
      })
    }

    const tasks = await Task.find({ project: project._id })
    res.status(201).json(tasks)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message })
  }
}

// delete task from project
export const deleteTask = async (req, res) => {
  try {
    const taskDelete = await Task.findByIdAndDelete(req.params.taskId).populate(
      'project'
    )

    if (!taskDelete) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (!taskDelete.project.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'User is not authorized to delete this content' })
    }

    await taskDelete.deleteOne()
    res.json({ message: 'Task deleted from project' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
