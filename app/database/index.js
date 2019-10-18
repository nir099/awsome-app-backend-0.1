// const MongoClient = require('mongodb').MongoClient;
// const uri = 'mongodb+srv://Nirmal:'+ process.env.MONGO_CLIENT_PASSSWORD+'@cluster0-zmcid.mongodb.net/test?retryWrites=true&w=majority';
// const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
// client.connect().then( ()=> {console.log('mongoose connected')})\

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/giftSweetGift' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if (!err) {
        console.log('Gift DB connected');
    } else {
        console.log('error in connecting DB' + JSON.stringify(err, undefined , 2));
    }
});

module.exports = {
     mongoose: mongoose
 } ;
