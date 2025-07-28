import User from '../models/User.js'
import { signToken } from '../utils/auth.js'

// create new user acc
export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    const token = signToken(user)
    res.status(201).json({ token, user })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message })
  }
}

// allows user to login
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    console.log('Found User: ', user)

    if (!user) {
      return res.status(400).json({ message: 'Cannot find User' })
    }

    const correctPw = await user.isCorrectPassword(req.body.password)

    if (!correctPw) {
      return res.status(400).json({ message: error.message })
    }

    const token = signToken(user)
    res.json({ token, user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

// helps with admin control
export const adminDashboard = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id)
    res.json(admin)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

// delete user
export const deleteUser = async (req, res) => {
  try {

    const deleteUser = await User.findByIdAndDelete(req.params.id)

    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res
      .status(200)
      .json({ message: 'User successfully deleted', user: deleteUser })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
