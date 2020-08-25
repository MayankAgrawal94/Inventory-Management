var Sequelize = require('sequelize'); // call sequelize here 
var DB = require('../../shared/dbConnection'); // call 

var ProdMstr = DB.sequelize.define('prod_mstr', {
    rec_id: {
      type: Sequelize.INTEGER,
      // unique : true,
      primaryKey : true,
      autoIncrement: true,
      comment: "Record Id"
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: "Product Name"
    },
    description: {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: null,
      comment: "Product Description"
    },
    quatity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "Product Quantity"
    },
  },{
    indexes: [
      {
        name: 'prodName',
        fields: ['name'],
      },
      // {
      //   name: 'usrName',
      //   fields: ['usr_name'],
      // },
    ],
    comment: "Product Master"
  }
);

// force: true will drop the table if it already exists
ProdMstr.sync({force: false}).then(function () {

  return;
});

module.exports = ProdMstr;