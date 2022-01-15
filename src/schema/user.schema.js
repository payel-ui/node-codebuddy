// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({
//     name: String,
// });

// module.exports = mongoose.model('User', userSchema);


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            defaultValue: sequelize.literal('NOW()')
        }
        
    }, {
        tableName: 'user',
        timestamp:false
    });
  
    return User;
  };