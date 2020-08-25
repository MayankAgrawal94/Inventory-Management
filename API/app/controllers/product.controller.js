const ProdMstrModel = require('../models/prodMstr.model');

var Sequelize = require('sequelize'); // call sequelize here 
const Op = Sequelize.Op

exports.fetch = (req, res) => {
	ProdMstrModel.findAll()
	.then(fetchAllProd=>{
		if(fetchAllProd.length > 0){
			res.status(200).send({
				error : false,
				message : "Data fetch successfully.",
				body: fetchAllProd
			})
		}else{
			res.status(200).send({
				error : true,
				message : "No Entry exists."
			})
		}
	},err=>{
		console.error(err)
		res.status(200).send({
			error : true,
			message : err.message || "Some error:10 occurred while retrieving the data."
		})
	})
}

exports.create = ( req, res ) => {
  let reqBody = { ...req.body }
	if(!reqBody.name ||
		 !reqBody.quatity )
		return res.status(200).send({
			error: true,
			message: "Please fill the complete form."
		})

	ProdMstrModel.findOne({
		where: {
			name : reqBody.name
		}
	})
	.then(findProduct=>{
		if(findProduct){
			return res.status(200).send({
				error: true,
				message: "Record already exists with same product name."
			})
		}else{
			ProdMstrModel.create(reqBody)
			.then(productCreated=>{
				if(productCreated){
					return res.status(200).send({
						error: false,
						message: "Recored creation successful.",
						body: productCreated
					})
				}else{
					return res.status(200).send({
						error: true,
						message: "Server encountered with error: 08, please try after some time."
					})
				}
			},err=>{
				console.log(err)
				return res.status(200).send({
					error: true,
					message: "Server encountered with error: 09, please try after some time."
				})
			})
		}
	},err=>{
		console.log(err)
		return res.status(200).send({
			error: true,
			message: "Server encountered with error: 10, please try after some time."
		})
	})
}

exports.delete = ( req, res ) => {

	let ids = []
	if(req.params._ids.toString().includes(',')){
		ids = req.params._ids.toString().split(',')
	}else{
		ids.push(req.params._ids)
	}
	if(ids.length == 1 && ids[0] == 0){
		return res.status(200).send({
			error: true,
			message: "Nothing to delete."
		})
	}
  
  ProdMstrModel.destroy({
  	where: {
  		rec_id: {
  			[Op.in]: ids
  		}
  	}
  }).then(ifDeleted=>{
  	if(!ifDeleted){
			return res.status(200).send({
				error: true,
				message: "Server encountered with error: 09, please try after some time."
			})
  	}else{
			return res.status(200).send({
				error: false,
				message: "Request taken successfully.",
			})
  	}
  },err=>{
		console.log(err)
		return res.status(200).send({
			error: true,
			message: "Server encountered with error: 10, please try after some time."
		})
  })
}