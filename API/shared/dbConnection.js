var Sequelize = require('sequelize'); // call sequelize here 
// const { Sequelize, DataTypes, Model } = require('sequelize');
const db = {};

////configuration of sequalize start here //////////////

const sequelize = new Sequelize(
    process.env.DB_INSTANCE,
    process.env.DB_USER,
    process.env.DB_PWD, 
    {
      // logging: console.log,
      logging: false,
      dialect: process.env.DB_DIALECT,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        // paranoid: true,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
      },
    }
);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;

module.exports = db;