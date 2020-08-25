var Sequelize = require('sequelize'); // call sequelize here 
var DB = require('../../shared/dbConnection'); // call 

var UsrMstr = DB.sequelize.define('usr_mstr', {
    rec_id: {
      type: Sequelize.INTEGER,
      // unique : true,
      primaryKey : true,
      autoIncrement: true,
      comment: "Record Id"
    },
    usr_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment: "User Name"
    },
    usr_email: {
      type: Sequelize.STRING(30),
      allowNull: false,
      comment: "Email"
    },
    usr_password: {
      type: Sequelize.STRING(80),
      allowNull: false,
      comment: "Password"
    },
    usr_status: {
      type: Sequelize.BOOLEAN,
      comment: "Active?",
      defaultValue: false
    },
  },{
    indexes: [
      {
        name: 'usrEmpID',
        fields: ['usr_email'],
      },
      // {
      //   name: 'usrName',
      //   fields: ['usr_name'],
      // },
    ],
    comment: "User Master"
  }
);

// force: true will drop the table if it already exists
UsrMstr.sync({force: false}).then(function () {
  employeeObj = {
      usr_name: 'Mayank Agrawal',
      usr_email: 'mnk.agrawal94@gmail.com',
      usr_password: '$2b$10$CT6t5EbrGwfHJH3RM0RSSuzMninkqieURV9qwqJcmnU5lGqyixhpy', // painText : Qwerty@123
      usr_contact_name: 'Mayank Agrawal',
      // usr_contact_no: ,
      usr_status: true,
  }
  UsrMstr.findOne()
  .then(find=>{
    // console.log( JSON.parse(JSON.stringify(find)))
    if(!find){
      UsrMstr.create(employeeObj)
    }
  },err=>{
    console.log(err)
  })
  return;
});

module.exports = UsrMstr;