// const mongoose = require('mongoose');

// module.exports = mongoose.connect('mongodb://localhost:27017/codebuddy-interview-node');

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "testdb",
    dialect: "postgres",
    SCHEMA: "public",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };