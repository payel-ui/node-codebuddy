const User = require('../schema/user.schema');
const Post = require('../schema/post.schema');
const { asyncForEach } = require('../helpers/async.helper');
const {sequelize, Sequelize,QueryTypes} = require('../schema');

// const user_tab = `${User.getTableName().schema}.${User.getTableName().tableName}`
// const post_tab = `${Post.getTableName().schema}.${Post.getTableName().tableName}`


module.exports.getUsersWithPostCount = async (req, res) => {
    try {
        // const users = await User.find({}).lean();
        
        // await asyncForEach(users, async (user, i) => {
        //     const posts = await Post.find({userId: user._id});
        //     users[i].posts = posts;
        // });

        // res.send({ users });
        let query = `select u.*,count(p."userId") postcount from public.user u join public.post p on u."userId" = p."userId" 
        group by u."userId"`;
        // let query = `select * from public.user u`;
        sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
            .then(data=>{
                if (data === undefined || data.length == 0) {
                    res.status(203).json({status:false, message: "No post found", data: data});
                }else
                { 
                    res.status(200).json({status:true, message: "post list", data: data})
                }
            }).catch(err=> { //catch block of promise query
                console.log(err)
                res.status(400).json({status:false, message: 'ERROR', err})
            });

    } catch (error) {
        res.send({error: error.message});
    }
}