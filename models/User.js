import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address']
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

//  pw hashing
userSchema.pre('save', async function (next) {
  if (this.password && (this.isNew || this.isModified('password'))) {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
  }

  next()
})

// custom method to compare & validate pw
userSchema.methods.isCorrectPassword = async function (password) {
  return this.password ? bcrypt.compare(password, this.password) : false
}

const User = mongoose.model('User', userSchema)

export default User
