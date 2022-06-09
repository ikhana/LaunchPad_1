import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as preSalesRouter from './src/preSales/preSale.js'
import * as userRouter from './src/users/user.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

await mongoose
	.connect(`mongodb://${process.env.DB_URI}/${process.env.DB_NAME}`, {useNewUrlParser: true})
	.then(() => {
		console.log('Local database connection is successful.')
	})
	.catch((error) => {
		console.log(error.message)
	})

app.use(express.json())
app.use(cors())
app.use('/pre_sale', preSalesRouter.router)
app.use('/user/', userRouter.router)

app.listen(port, () => {
	console.log(`Server listening on port : ${port}`)
})
