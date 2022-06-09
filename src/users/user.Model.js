import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
	role: String,
	address: String,
	
})
const User = mongoose.model('users', UserSchema)
export default User
