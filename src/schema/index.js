const dbHelper = require("../helpers/db.helper");
const fs = require('fs');
const path = require('path');
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const sequelize = new Sequelize(dbHelper.DB, dbHelper.USER, dbHelper.PASSWORD, {
  host: dbHelper.HOST,
  dialect: dbHelper.dialect,
  operatorsAliases: false,

  pool: {
    max: dbHelper.pool.max,
    min: dbHelper.pool.min,
    acquire: dbHelper.pool.acquire,
    idle: dbHelper.pool.idle
  }
});

const db = {};
const SCHEMA = dbHelper.SCHEMA;
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// var models = [                 
//   'User',            
// ];
// models.forEach(model => {
//   module.exports[model] = sequelize.import(__dirname + '/' + model);
// });


fs
  // .readdirSync(__dirname)
  .readdirSync(__dirname)
  .filter(file => {
    // console.log(file);
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let model  = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log(model);
    console.log(SCHEMA);
    SCHEMA ? model = model.schema(SCHEMA) : null;
    // const model = sequelize['import'](path.join(__dirmodel, file));
    console.log(model);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

// db.user = require("./user")(sequelize, Sequelize);

// module.exports = db;