import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  projectDueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Discovery', 'In Progress', 'Completed'],
    default: 'Discovery'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Project = mongoose.model('Project', projectSchema)

export default Project
