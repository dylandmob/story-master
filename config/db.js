const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected!!');
  } catch (err) {
    console.error(err.message);
    console.log('ERROR CONNECTING', err.message);
    console.error('ERROR CONSOLE TESTING LOG STUFF', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
