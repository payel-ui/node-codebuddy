const app = require('./src/app');
// const connection = require('./src/helpers/db.helper');
const db = require("./src/schema");
db.sequelize.sync();

// connection.then(() => {
    app.listen(3000, () => {
        console.log('Server started on port http://localhost:3000');
    });
// }).catch(err => {
//     console.log(err);
//     process.exit(1);
// });