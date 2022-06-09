import User from './user.Model.js'
import PreScale from '../preSales/preSale.Model.js'
import express from 'express'

const router = express.Router()

router.post('/login', async (req, res) => {
	try {
		const existUser = await User.findOne({address: req.body.address})
		let result = existUser ? existUser : await User.create(req.body)
		const userTokens = await PreScale.find({address: result.address})
		return res.status(200).send({status: true, message: 'User data', data: result, tokens: userTokens})
	} catch (error) {
		return res.status(500).send({status: false, message: error.message})
	}
})

router.get('/view_all_projects', async (req, res) => {
	try {
		const result = await PreScale.find()
		return res.status(200).send({status: true, message: 'All projects', data: result})
	} catch (error) {
		return res.status(500).send({status: false, message: error.message})
	}
})

// router.post('/user/token', async (req, res) => {
// 	try {
// 		const existToken = await PreScale.find({address: req.body.address})
// 		if (existToken) {
// 			return res.status(204).send({status: false, message: 'You can not invest urself'})
// 		}
// 		return res.status(200).send({status: true, message: 'token not found'})
// 	} catch (error) {
// 		return res.status(500).send({status: false, message: error.message})
// 	}
// })

/* // useless
router.post('/user/add', async (req, res) => {
	try {
		const existUser = await User.findOne({address: req.body.address})
		if (!existUser) {
			const result = await User.create(req.body)
			return res.status(201).send({status: true, message: 'User added successfully', data: result})
		}
		return res.status(409).send({status: false, message: 'User already exist'})
	} catch (error) {
		return res.status(500).send({status: false, message: error.message})
	}
})

router.post('/user/update', async (req, res) => {
	try {
		const existUser = await PreScale.findOne({address: req.body.address})
		if (existUser) {
			const updateUser = await PreScale.updateOne({address: req.body.address}, {$set: req.body})
			return res.status(204).send({status: true, message: 'User updated'})
		}
		return res.status(304).send({status: true, message: 'User not updated'})
	} catch (error) {
		return res.status(500).send({status: false, message: error.message})
	}
})
*/
export {router}
