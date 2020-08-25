process.env.NODE_ENV = process.env.NODE_ENV || "development"  // "TESTING" // "PRODUCTION"
// console.log("................",process.env.NODE_ENV)

if(process.env.NODE_ENV == 'production'){

	// app variables
	process.env.PORT="31022"

	// Dev database variables


	// secure data


	// previous variables

}else if(process.env.NODE_ENV == 'staging'){

	// app variables


	// Dev database variables


	// secure data


	// previous variables
}else{

	// app variables
	process.env.PORT="31000"

	// Dev database variables
	process.env.DB_INSTANCE = "inv_mgmt"
	process.env.DB_USER = "root"
	process.env.DB_PWD = ""
	process.env.DB_DIALECT = "mysql"
	process.env.JWT_SECRET = "mySecretKey"

	// secure data
	// process.env.INVOICE_PATH = "./public/expense_bills/"

	// previous variables
}
