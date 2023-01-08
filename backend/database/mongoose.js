const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager',{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("DataBase Connected"))
.catch((error) => console.log(error));


//exporting, so that another js file can import it and use it as mongoose
module.exports = mongoose;