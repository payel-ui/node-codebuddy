const User = require("../schema/").User;
const Post = require("../schema/").Post;
const {sequelize, Sequelize} = require('../schema');


module.exports.createPost = (req, res) => {
    try {
        const { userId, title, description } = req.body;

        
        // TODO: 1. Validate userId, title, description
        /**
         * Validation criteria:
         * 1. userId must be a valid ObjectId
         * 2. title must be a string and minimum of 10 characters excluding spaces
         * 3. description must be a string and minimum of 50 characters excluding spaces
         */
        // console.log(title.replace(/\s/g,'').length);
        if(typeof title !== 'string')
            res.status(400).json('Title should be string');
        else if(title.replace(/\s/g,'').length <= 10 )
            res.status(400).json('Title should not be less than 10');
        else if(typeof description !== 'string')
            res.status(400).json('Description should be string');
        else if(description.replace(/\s/g,'').length <= 50 )
            res.status(400).json('Description should not be less than 10');
        else{
            User.findOne({ userId }).then(data=>{
            if(data == null){
                res.status(203).json({status:false, message: "Not a valid user object", data});
            }else{
                let u = {
                    userId: userId,
                    title: title,
                    description:description
                }
                Post.create(u).then(data=>{
                    res.status(201).json({status:true, message: 'Post created successfully', data});
                }).catch(err=> {
                    console.log(err);
                    res.status(400).json({status:false, message: 'ERROR', err});
                });
            }
            }).catch(err=> { 
                    console.log(err)
                    res.status(400).json({status:false, message: 'ERROR', err})
            })
        }
    } catch (error) {
        res.send({error: error.message});
    }
}