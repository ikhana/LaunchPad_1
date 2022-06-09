import PreScale from './preSale.Model.js'
import User from '../users/user.Model.js'
import express from 'express'

const router = express.Router()

router.post('/add', async (req, res) => {
	try {
		console.log("error", req.body.token)
		const existToken = await PreScale.findOne({token: req.body.token})
		if (!existToken) {
			const result = await PreScale.create(req.body)
			return res.status(201).send({status: true, message: 'Presale added successfully', data: result})
		}
		return res.status(409).send({status: false, message: 'Presale already exists'})
	} catch (error) {
		return res.status(500).send({status: false, message: error.message})
	}
})

router.post('/find', async (req, res) => {
	try {
		const existToken = await PreScale.find({address: req.body.address})
		if (existToken) {
			return res.status(200).send({status: true, message: 'Presale token', data: existToken})
		}
		return res.status(200).send({status: false, message: 'Presale token not found'})
	} catch (error) {
		return res.status(500).send({status: false, message: error.message})
	}
})

router.post('/update', async (req, res) => {
	try {
		const existUser = await PreScale.findOne({token: req.body.token})
		if (existUser) {
			const updateUser = await PreScale.updateOne({token: req.body.token}, {$set: req.body.endTime})
			return res.status(204).send({status: true, message: 'Presale updated'})
		}
		return res.status(304).send({status: true, message: 'Presale not updated'})
	} catch (error) {
		return res.status(500).send({status: false, message: error.message})
	}
})

export {router}
