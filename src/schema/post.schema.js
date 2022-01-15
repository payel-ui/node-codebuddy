// const mongoose = require('mongoose');
// const { Schema, Types } = mongoose;

// const postSchema = new Schema({
//     userId: Types.ObjectId,
//     title: String,
//     description: String,
// });

// module.exports = mongoose.model('Post', postSchema);

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        userId : {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        description: {
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
        tableName: 'post',
        timestamp:false
    });
  
    return Post;
  };