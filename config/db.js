const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {
    try{
       await mongoose.connect(process.env.DB_MONGO, {
           useCreateIndex: true,
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useFindAndModify: false
       });
       console.log('BBDD conectada');
    }
    catch(error){
        console.log(error);
        process.exit(1); //Detiene la app en caso de Error
    }
}

module.exports = conectarDB;