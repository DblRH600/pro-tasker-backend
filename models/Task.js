import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  taskDueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Task = mongoose.model('Task', taskSchema)

export default Task
