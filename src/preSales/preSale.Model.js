import mongoose from 'mongoose'
const PreSaleSchema = new mongoose.Schema({
	address: String,
	token: String,
	softCap:String,
	endTime:String,
	startTime: String,
	saleTitle: String
})
const PreScale = mongoose.model('presales', PreSaleSchema)
export default PreScale
