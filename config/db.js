const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB Connected!');
  } catch (err) {
    console.error(err);
    console.log('ERROR CONNECTING', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
