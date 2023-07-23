const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/gestionFlotas'; 

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
