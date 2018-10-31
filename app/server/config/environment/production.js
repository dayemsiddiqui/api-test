// Production specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://localhost/kibopush-prod'
    },
    seedDB: false,
  }
  